const Admin = require('../model/Admin')
const ActivityAdmin = require('../model/ActivityAdmin')
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {
    try {
        const { email, nama, nik, role, namaAdmin, userUpdate } = req.body;

        // Validate form
        if (!email || !nama || !nik || !role) {
            throw { message: "Please fill the form correctly!" };
        }

        // Validate email format
        if (!isValidEmail(email)) {
            throw { message: "Please enter a valid email address!" };
        }

        // Validate existed user
        const existingAdmin = await Admin.findOne({ where: { email: email } });
        if (existingAdmin) {
            throw { message: "Email already exists!" };
        }

        // Generate password based on nik
        const password = nik;

        // Hash the password
        const hash = await bcrypt.hash(password, 10);

        // Create new admin
        const newAdmin = await Admin.create({ nik, nama, email, password: hash, role, userUpdate });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${namaAdmin} (${userUpdate}) menambahkan admin ${nik}`
        });

        const message = "Admin successfully registered!";
        res.json({ newAdmin, message });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ error: err.message });
    }
}

exports.index = async (req, res) => {
    try {
        const getAllAdmin = await Admin.findAll({
            attributes: ['id', 'uuid', 'nik', 'nama', 'email', 'role', 'status']
        });
        res.json(getAllAdmin);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.show = async (req, res) => {
    try {
        const { nik } = req.params;
        const getAdmin = await Admin.findOne({
            where: {nik: nik},
            attributes: ['id', 'uuid', 'nik', 'nama', 'email', 'role', 'status']
        });
        res.json(getAdmin);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.edit = async (req, res) => {
    try {
        const { email, nama, password, status, userUpdate } = req.body;
        const uuid = req.params.uuid;

        if (!nama || !email || !password) {
            return res.status(400).json({ message: "Nama, email dan password harus diisi!" });
        }

        if (email && !isValidEmail(email)) {
            return res.status(401).json({ message: "Please enter a valid email address!" });
        }

        if (password && password.length < 8) {
            return res.status(401).json({ message: "Password must be at least 8 characters long!" });
        }

        const hash = await bcrypt.hash(password, 10);

        const editAdmin = await Admin.update(
            { email, nama, password: hash, status, userUpdate },
            { where: { uuid: uuid } }
        );

        if (editAdmin[0] === 0) {
            return res.status(400).json({ message: "User not found!" });
        }

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) melakukan perubahan email/password`
        });

        return res.json({
            editAdmin: { id: editAdmin.id, uuid, email, nama, password: hash, status },
            message: 'User successfully edited!'
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
}

exports.delete = async (req, res) => {
    try {
        const uuid = req.params.uuid;
        await Admin.destroy({ where: { uuid: uuid } });
        res.json({ message: "Admin successfully deleted!" });
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ message: "Email dan password harus diisi!" });
        }

        const getAdmin = await Admin.findOne({ where: { email: email } });
        if (!getAdmin) {
            return res.status(401).json({ message: "Email tidak terdaftar!" });
        }

        if (!password) {
            return res.status(400).json({ message: "Password harus diisi!" });
        }

        if (!getAdmin.status) {
            return res.status(401).json({ message: "Akun Anda tidak aktif, hubungi administrator!" });
        }

        const result = await bcrypt.compare(password, getAdmin.password);
        if (result) {
            req.session.adminId = getAdmin.uuid;
            return res.status(200).json({ message: "Login berhasil!", email: email });
        } else {
            return res.status(401).json({ message: "Password salah!" });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ message: "Server error" });
    }
}

exports.auth = async (req, res) => {
    try {
        if (req.session.adminId) {
            const user = await Admin.findOne({ where: { uuid: req.session.adminId } });
            if (!user) {
                return res.status(404).json({ message: 'Pengguna tidak ditemukan.' });
            }
            console.log('Pengguna telah login:', user.email);
            res.json({
                adminId: req.session.adminId,
                nama: user.nama,
                email: user.email,
                nik: user.nik,
                role: user.role
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
    if (req.session.adminId) {
        req.session.adminId = null;
        console.log('Sesi berhasil dihapus.');
        res.json({ message: 'Sesi berhasil dihapus.' });
    } else {
        res.status(400).json({ message: 'Tidak ada sesi yang aktif.' });
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { nik } = req.params;
        const { nama, userUpdate } = req.body;

        const getAdmin = await Admin.findOne({ where: { nik: nik } });
        if (!getAdmin) {
            return res.status(404).json({ message: "Admin tidak ditemukan!" });
        }

        // Reset password to default 'dplk'
        const newPassword = "dplk";
        const hash = await bcrypt.hash(newPassword, 10);
        await Admin.update({ password: hash, userUpdate }, { where: { nik: nik } });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) mereset password akun admin ${nik}`
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