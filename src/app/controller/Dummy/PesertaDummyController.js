const Peserta = require('../../model/Peserta')
const bcrypt = require('bcryptjs')
const db= require('../../config/dummy')

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
        const existingPeserta = await Peserta.findOne({ where: { no_peserta: no_peserta } });
        if (existingPeserta) {
            return res.status(400).json({ message: "Akun sudah terdaftar!" });
        }

        // Hash the password
        const hash = await bcrypt.hash(password, 10);

        // Create new Peserta
        const newPeserta = await Peserta.create({ no_peserta, email, password: hash });

        const message = "Peserta successfully registered!";
        res.json({ newPeserta, message });
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

        const getAllPeserta = await Peserta.findAll({
            attributes: ['id', 'no_peserta', 'email', 'block_count', 'status'],
            where: whereClause,
        });
        res.json(getAllPeserta);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.show = async (req, res) => {
    try {
        const no_peserta = req.params.no_peserta;
        const getPeserta = await Peserta.findOne({
            where: {no_peserta: no_peserta},
            attributes: ['id', 'no_peserta', 'email', 'block_count', 'status']
        });

        if (!getPeserta) {
            return res.status(404).json({ message: "Nomor Peserta tidak ditemukan!" });
        }
        
        res.json(getPeserta);
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

        const editPeserta = await Peserta.update(
            { email, password: hash, status },
            { where: { no_peserta: no_peserta } }
        );

        if (editPeserta[0] === 0) {
            return res.status(400).json({ message: "User not found!" });
        }

        return res.json({
            editPeserta: { id: editPeserta.id, email, no_peserta, password: hash, status },
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

        const getPeserta = await Peserta.findOne({ where: { no_peserta: no_peserta } });
        if (!getPeserta) {
            return res.status(401).json({ message: "Nomor Peserta tidak terdaftar! Silakan registrasikan Nomor Peserta Anda terlebih dahulu!" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password harus diisi!" });
        }

        if (!getPeserta.status) {
            return res.status(401).json({ message: "Akun Anda tidak aktif, hubungi Administrator!" });
        }

        const result = await bcrypt.compare(password, getPeserta.password);
        if (result) {
            // Reset block_count if login successful
            await Peserta.update({ block_count: 0 }, { where: { no_peserta: no_peserta } });

            req.session.userId = getPeserta.no_peserta;
            return res.status(200).json({ message: "Login berhasil!", no_peserta: no_peserta });
        } else {
            // Increase block_count if login failed
            await Peserta.increment('block_count', { by: 1, where: { no_peserta: no_peserta } });
            
            // Check if block_count reaches 3
            const updatedPeserta = await Peserta.findOne({ where: { no_peserta: no_peserta } });
            if (updatedPeserta.block_count === 3) {
                return res.status(401).json({ message: "Percobaan Login tersisa 2 kali lagi sebelum akun terblokir!" });
            } else if (updatedPeserta.block_count >= 5) {
                // Update status to false if block_count reaches 5
                await Peserta.update({ status: false }, { where: { no_peserta: no_peserta } });
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
            const user = await Peserta.findOne({ where: { no_peserta: req.session.userId } });
            if (!user) {
                return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
            }
            const namaPesertaQuery = `
                SELECT nama_lengkap 
                FROM NASABAHDPLK 
                WHERE no_peserta = '${req.session.userId}'`;

            db.query(namaPesertaQuery, (err, result) => {
                if (err) {
                    console.error('Error querying database:', err);
                    return res.status(500).json({ message: 'Server error' });
                }

                if (result.length > 0) {
                    const namaPeserta = result[0].nama_lengkap;

                    console.log('Pengguna telah login:', user.no_peserta);
                    res.json({
                        userId: req.session.userId,
                        nama: namaPeserta,
                        email: user.email
                    });
                } else {
                    console.error('Nama peserta tidak ditemukan.');
                    return res.status(404).json({ message: 'Nama peserta tidak ditemukan.' });
                }
            });
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

        const getPeserta = await Peserta.findOne({ where: { no_peserta: no_peserta } });
        if (!getPeserta) {
            return res.status(404).json({ message: "Nomor Peserta tidak ditemukan!" });
        }

        // Update status to true and reset block_count
        await Peserta.update({ status: true, block_count: 0 }, { where: { no_peserta: no_peserta } });

        return res.status(200).json({ message: "Akun berhasil diaktifkan kembali." });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Server error" });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { no_peserta } = req.params;

        const getPeserta = await Peserta.findOne({ where: { no_peserta: no_peserta } });
        if (!getPeserta) {
            return res.status(404).json({ message: "Nomor Peserta tidak ditemukan!" });
        }

        // Reset password to default 'dplk'
        const newPassword = "dplk";
        const hash = await bcrypt.hash(newPassword, 10);
        await Peserta.update({ password: hash }, { where: { no_peserta: no_peserta } });

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

    return new Promise((resolve, reject) => {
        db.query(query, (err, result) => {
            if (err) {
                console.error('Error querying database:', err);
                reject(false);
            }

            resolve(result.length > 0);
        });
    });
}