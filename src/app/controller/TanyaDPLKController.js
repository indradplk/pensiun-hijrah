const TanyaDPLK = require('../model/TanyaDPLK')
const ActivityAdmin = require('../model/ActivityAdmin')
const { Op } = require('sequelize')

exports.index = async (req, res) => {
    try {
        const statusFilter = req.query.status;
        const whereClause = {};

        // Jika filter tersedia dan valid, tambahkan filter berdasarkan status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        const getAllMail = await TanyaDPLK.findAll({
            attributes: ['id', 'name', 'subject', 'email', 'no_telp', 'text', 'status', 'userUpdate', 'createdAt'],
            where: whereClause,
        });
        res.json(getAllMail);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.show = async (req, res) => {
    try {
        const id = req.params.id;
        const getMail = await TanyaDPLK.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'subject', 'email', 'no_telp', 'text', 'status', 'userUpdate', 'createdAt']
        });
        res.json(getMail);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.update = async (req, res) => {
    try {
        const { id } = req.params;
        const { nama, nik, email } = req.body;

        // Cek apakah Mail dengan ID yang diberikan ada
        const existingMail = await TanyaDPLK.findByPk(id);
        if (!existingMail) {
            return res.status(400).json({ message: "Email tidak ditemukan!" });
        }

        // Validasi form
        if (!nik) {
            return res.status(400).json({ message: "NIK harus diisi!" });
        }

        // Update status to true
        const editMail = await existingMail.update({
            userUpdate: nik, status: true
        });

        await ActivityAdmin.create({
            nik: nik,
            log: `${nama} (${nik}) telah merespon email dari ${email}`
        });

        const message = "Email berhasil diperbarui!";
        res.json({ editMail, message });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Terjadi kesalahan server." });
    }
}