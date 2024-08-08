const Perusahaan = require('../model/Perusahaan')
const ActivityAdmin = require('../model/ActivityAdmin')
const { connectToDatabasePPUKP } = require('../config/ppukp')
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {
    try {
        const { email, password, no_peserta } = req.body;

        // Validate form
        if (!email || !password || !no_peserta) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        // Validate email format
        if (!isValidEmail(email)) {
            return res.status(400).json({ message: "Masukkan alamat email yang valid!" });
        }

        // Validate password length
        if (password.length < 8) {
            return res.status(400).json({ message: "Password harus terdiri dari minimal 8 karakter!" });
        }

        // Check if no_peserta exists in T2KR
        const isRegistered = await checkIfExists(no_peserta);
        if (!isRegistered) {
            return res.status(400).json({ message: "Anda tidak terdaftar sebagai peserta DPLK Syariah Muamalat" });
        }

        // Validate existed user
        const existingPerusahaan = await Perusahaan.findOne({ where: { no_peserta: no_peserta } });
        if (existingPerusahaan) {
            return res.status(400).json({ message: "Akun sudah terdaftar!" });
        }

        // Hash the password
        const hash = await bcrypt.hash(password, 10);

        // Create new Perusahaan
        const newPerusahaan = await Perusahaan.create({ no_peserta, email, password: hash });

        const message = "Perusahaan successfully registered!";
        res.json({ newPerusahaan, message });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}

exports.index = async (req, res) => {
    try {
        const statusFilter = req.query.status;
        const whereClause = {};

        // Jika filter tersedia dan valid, tambahkan filter berdasarkan status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        const getAllPerusahaan = await Perusahaan.findAll({
            attributes: ['id', 'no_peserta', 'email', 'block_count', 'status'],
            where: whereClause,
        });
        res.json(getAllPerusahaan);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.show = async (req, res) => {
    try {
        const no_peserta = req.params.no_peserta;
        const getPerusahaan = await Perusahaan.findOne({
            where: {no_peserta: no_peserta},
            attributes: ['id', 'no_peserta', 'email', 'block_count', 'status']
        });

        if (!getPerusahaan) {
            return res.status(404).json({ message: "Nomor Peserta tidak ditemukan!" });
        }

        res.json(getPerusahaan);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}


exports.edit = async (req, res) => {
    try {
        const { email, password, status } = req.body;
        const no_peserta = req.params.no_peserta;

        if (!email || !password) {
            return res.status(400).json({ message: "Email dan password harus diisi!" });
        }

        if (email && !isValidEmail(email)) {
            return res.status(401).json({ message: "Please enter a valid email address!" });
        }

        if (password && password.length < 8) {
            return res.status(401).json({ message: "Password must be at least 8 characters long!" });
        }

        const hash = await bcrypt.hash(password, 10);

        const editPerusahaan = await Perusahaan.update(
            { email, password: hash, status },
            { where: { no_peserta: no_peserta } }
        );

        if (editPerusahaan[0] === 0) {
            return res.status(400).json({ message: "User not found!" });
        }

        return res.json({
            editPerusahaan: { id: editPerusahaan.id, email, no_peserta, password: hash, status },
            message: 'User successfully edited!'
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
}

exports.login = async (req, res) => {
    try {
        const { no_peserta, password } = req.body;

        if (!no_peserta || !password) {
            return res.status(400).json({ message: "Nomor peserta dan password harus diisi!" });
        }

        const getPerusahaan = await Perusahaan.findOne({ where: { no_peserta: no_peserta } });
        if (!getPerusahaan) {
            return res.status(401).json({ message: "Nomor Peserta tidak terdaftar! Silakan registrasikan Nomor Peserta Anda terlebih dahulu!" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password harus diisi!" });
        }

        if (!getPerusahaan.status) {
            return res.status(401).json({ message: "Akun Anda tidak aktif, hubungi Administrator!" });
        }

        const result = await bcrypt.compare(password, getPerusahaan.password);
        if (result) {
            // Reset block_count if login successful
            await Perusahaan.update({ block_count: 0 }, { where: { no_peserta: no_peserta } });

            req.session.userId = getPerusahaan.no_peserta;
            return res.status(200).json({ message: "Login berhasil!", no_peserta: no_peserta });
        } else {
            // Increase block_count if login failed
            await Perusahaan.increment('block_count', { by: 1, where: { no_peserta: no_peserta } });
            
            // Check if block_count reaches 2
            const updatedPerusahaan = await Perusahaan.findOne({ where: { no_peserta: no_peserta } });
            if (updatedPerusahaan.block_count === 2) {
                return res.status(401).json({ message: "Percobaan Login tersisa 1 kali lagi sebelum akun terblokir!" });
            } else if (updatedPerusahaan.block_count >= 3) {
                // Update status to false if block_count reaches 3
                await Perusahaan.update({ status: false }, { where: { no_peserta: no_peserta } });
                return res.status(401).json({ message: "Akun terblokir, hubungi Administrator!" });
            }

            return res.status(401).json({ message: "Password salah!" });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Server error" });
    }
}

exports.auth = async (req, res) => {
    try {
        if (req.session.userId) {
            const user = await Perusahaan.findOne({ where: { no_peserta: req.session.userId } });
            if (!user) {
                return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
            }
            const namaPesertaQuery = `
                SELECT nama_lengkap , KODE_NASABAH_CORPORATE
                FROM NASABAHDPLK 
                WHERE no_peserta = '${req.session.userId}'`;

            const pool = await connectToDatabasePPUKP();
            const result = await pool.request().query(namaPesertaQuery);

            if (result.recordset.length > 0) {
                const namaPeserta = result.recordset[0].nama_lengkap;
                const KODE_NASABAH_CORPORATE = result.recordset[0].KODE_NASABAH_CORPORATE;

                console.log('Pengguna telah login:', user.no_peserta);
                res.json({
                    userId: req.session.userId,
                    nama: namaPeserta,
                    email: user.email,
                    kode_corporate: KODE_NASABAH_CORPORATE
                });
            } else {
                console.error('Nama peserta tidak ditemukan.');
                return res.status(404).json({ message: 'Nama peserta tidak ditemukan.' });
            }
        } else {
            console.log('Pengguna belum login.');
            return res.status(401).json({ message: 'Pengguna belum login.' });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Server error" });
    }
}

exports.logout = async (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Gagal menghapus sesi:', err.message);
            res.status(500).json({ message: 'Gagal menghapus sesi.' });
        } else {
            console.log('Sesi berhasil dihapus.');
            res.json({ message: 'Sesi berhasil dihapus.' });
        }
    });
}

exports.unblockAccount = async (req, res) => {
    try {
        const { no_peserta } = req.params;
        const { nama, userUpdate } = req.body;

        const getPerusahaan = await Perusahaan.findOne({ where: { no_peserta: no_peserta } });
        if (!getPerusahaan) {
            return res.status(404).json({ message: "Nomor Peserta tidak ditemukan!" });
        }

        // Update status to true and reset block_count
        await Perusahaan.update({ status: true, block_count: 0, userUpdate }, { where: { no_peserta: no_peserta } });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) membuka blokir akun perusahaan ${no_peserta}`
        });

        return res.status(200).json({ message: "Akun berhasil diaktifkan kembali." });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Server error" });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { no_peserta } = req.params;
        const { nama, userUpdate } = req.body;

        const getPerusahaan = await Perusahaan.findOne({ where: { no_peserta: no_peserta } });
        if (!getPerusahaan) {
            return res.status(404).json({ message: "Nomor Peserta tidak ditemukan!" });
        }

        // Reset password to default 'dplk'
        const newPassword = "dplk";
        const hash = await bcrypt.hash(newPassword, 10);
        await Perusahaan.update({ password: hash, userUpdate }, { where: { no_peserta: no_peserta } });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) mereset password akun perusahaan ${no_peserta}`
        });

        return res.status(200).json({ message: "Password berhasil direset." });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Server error" });
    }
}

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

async function checkIfExists(no_peserta) {
    const query = `
        SELECT * 
        FROM NASABAHDPLK 
        WHERE no_peserta = '${no_peserta}'`;

    try {
        const pool = await connectToDatabasePPUKP();
        const result = await pool.request().query(query);
        return result.recordset.length > 0; // Return true if peserta exists, false otherwise
    } catch (error) {
        console.error('Error querying database:', error);
        return false;
    }
}