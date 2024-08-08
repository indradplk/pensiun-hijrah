const Office = require('../model/Office')
const ActivityAdmin = require('../model/ActivityAdmin')
const { Op } = require('sequelize')

exports.index = async (req, res) => {
    try {
        const statusFilter = req.query.status;
        const whereClause = {};
        
        const page = parseInt(req.query.page) || 1;
        const limit = 15;

        // Jika filter tersedia dan valid, tambahkan filter berdasarkan status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        let getAllOffice;
        if (req.query.page) {
            const offset = (page - 1) * limit;
            getAllOffice = await Office.findAll({
                attributes: ['id', 'kode_cabang', 'nama', 'cabang', 'area', 'alamat', 'telepon'],
                where: whereClause,
                limit: limit,
                offset: (page - 1) * limit
            });
        } else {
            getAllOffice = await Office.findAll({
                attributes: ['id', 'kode_cabang', 'nama', 'cabang', 'area', 'alamat', 'telepon'],
                where: whereClause
            });
        }

        res.json(getAllOffice);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.show = async (req, res) => {
    try {
        const id = req.params.id;
        const getOffice = await Office.findOne({
            where: { id: id },
            attributes: ['id', 'kode_cabang', 'nama', 'cabang', 'area', 'alamat', 'telepon', 'status']
        });
        res.json(getOffice);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.create = async (req, res) => {
    try {
        const { kode_cabang, nama, cabang, area, alamat, telepon, namaAdmin, userUpdate } = req.body;

        // Validasi form
        if (!kode_cabang || !nama || !cabang || !area || !alamat || !telepon) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        // Create Office
        const newOffice = await Office.create({
            kode_cabang, nama, cabang, area, alamat, telepon, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${namaAdmin} (${userUpdate}) menambahkan kantor ${nama}`
        });

        const message = "Office berhasil dibuat!";
        res.json({ newOffice, message });
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.edit = async (req, res) => {
    try {
        const { kode_cabang, nama, cabang, area, alamat, telepon, namaAdmin, userUpdate } = req.body;
        const { id } = req.params;

        // Cek apakah Office dengan ID yang diberikan ada
        const existingOffice = await Office.findByPk(id);
        if (!existingOffice) {
            return res.status(400).json({ message: "Office tidak ditemukan!" });
        }

        // Validasi form
        if (!kode_cabang || !nama || !cabang || !area || !alamat || !telepon) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        // Update Office
        const editOffice = await existingOffice.update({
            kode_cabang, nama, cabang, area, alamat, telepon, status: false, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${namaAdmin} (${userUpdate}) memperbarui kantor ${nama}`
        });

        const message = "Office berhasil diperbarui!";
        res.json({ editOffice, message });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Terjadi kesalahan server." });
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const { nama, userUpdate, namaAdmin } = req.body;

        // Cari Office yang akan dihapus
        const OfficeToDelete = await Office.findByPk(id);
        if (!OfficeToDelete) {
            return res.status(400).json({ message: "Office tidak ditemukan!" });
        }

        await OfficeToDelete.destroy();

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${namaAdmin} (${userUpdate}) menghapus kantor ${nama}`
        });

        res.json({message:"Office berhasil dihapus!"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

exports.accept = async (req, res) => {
    try {
        const { nama, userUpdate, namaAdmin } = req.body;
        const { id } = req.params;

        // Cek apakah Office dengan ID yang diberikan ada
        const existingOffice = await Office.findByPk(id);
        if (!existingOffice) {
            return res.status(400).json({ message: "Kantor tidak ditemukan!" });
        }

        // Update data Office
        const updatedOffice = await existingOffice.update({
            status: true, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${namaAdmin} (${userUpdate}) menyetujui pembuatan kantor ${nama}`
        });

        const message = "Kantor berhasil diperbarui!";
        res.json({ updatedOffice, message });
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}