const Management = require('../model/Management')
const ActivityAdmin = require('../model/ActivityAdmin')
const { Op } = require('sequelize')
const path = require('path')
const fs = require('fs')

exports.index = async (req, res) => {
    try {
        const statusFilter = req.query.status;
        const whereClause = {};

        // Jika filter tersedia dan valid, tambahkan filter berdasarkan status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        const getAllManagement = await Management.findAll({
            attributes: ['id', 'nama', 'jabatan', 'path_management', 'description', 'kategori', 'status'],
            where: whereClause,
        });

        res.json(getAllManagement);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.show = async (req, res) => {
    try {
        const id = req.params.id;
        const getManagement = await Management.findOne({
            where: { id: id },
            attributes: ['id', 'nama', 'jabatan', 'path_management', 'description', 'kategori', 'status']
        });
        res.json(getManagement);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.create = async (req, res) => {
    try {
        const { nama, jabatan, description, kategori, namaAdmin, userUpdate } = req.body;

        // Cek apakah gambar diupload
        if (!req.files || !req.files.path_management || req.files.path_management.length === 0) {
            return res.status(400).json({ message: "Silakan unggah gambar!" });
        }

        if (!nama || !jabatan || !description || !kategori) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }
        
        const path_management = path.basename(req.files.path_management[0].path);

        // Validasi form
        const newManagement = await Management.create({
            nama, jabatan, description, kategori, path_management, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${namaAdmin} (${userUpdate}) menambahkan manajemen ${nama}`
        });

        const message = "Manajemen berhasil dibuat!";
        res.json({ newManagement, message });
    } catch (err) {
        if (req.files && req.files.path_management && req.files.path_management.length > 0) {
            fs.unlinkSync(req.files.path_management[0].path);
        }
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.update = async (req, res) => {
    try {
        const { nama, jabatan, description, kategori, namaAdmin, userUpdate } = req.body;
        const { id } = req.params;

        // Cek apakah Management dengan ID yang diberikan ada
        const existingManagement = await Management.findByPk(id);
        if (!existingManagement) {
            return res.status(400).json({ message: "Manajemen tidak ditemukan!" });
        }

        // Cek apakah gambar diupload
        if (!req.files || !req.files.path_management || req.files.path_management.length === 0) {
            return res.status(400).json({ message: "Silakan unggah gambar!" });
        }

        if (!nama || !jabatan || !description || !kategori) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        // Hapus file lama sebelum update
        if (existingManagement.path_management) {
            fs.unlinkSync(path.join('../../public/about/manajemen', existingManagement.path_management));
        }

        const path_management = path.basename(req.files.path_management[0].path);

        // Update data Management
        const updatedManagement = await existingManagement.update({
            nama, jabatan, description, kategori, status: false, path_management, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${namaAdmin} (${userUpdate}) memperbarui manajemen ${nama}`
        });

        const message = "Manajemen berhasil diperbarui!";
        res.json({ updatedManagement, message });
    } catch (err) {
        if (req.files && req.files.path_management && req.files.path_management.length > 0) {
            fs.unlinkSync(req.files.path_management[0].path);
        }
        console.error(err.message);
        res.status(500).json({ message: "Terjadi kesalahan server." });
    }
}

exports.delete = async (req, res) => {
    try {
        const id= req.params.id;
        const { nama, userUpdate, namaAdmin } = req.body;

        // Cari Management yang akan dihapus
        const ManagementToDelete = await Management.findByPk(id);
        if (!ManagementToDelete) {
            return res.status(400).json({ message: "Data Manajemen tidak ditemukan!" });
        }

        // Hapus file dari direktori
        if (ManagementToDelete.path_management) {
            fs.unlinkSync(path.join('../../public/about/manajemen', ManagementToDelete.path_management));
        }

        await ManagementToDelete.destroy();

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${namaAdmin} (${userUpdate}) menghapus manajemen ${nama}`
        });

        res.json({message:"Manajemen berhasil dihapus!"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

exports.accept = async (req, res) => {
    try {
        const { nama, userUpdate, namaAdmin } = req.body;
        const { id } = req.params;

        // Cek apakah Management dengan ID yang diberikan ada
        const existingManagement = await Management.findByPk(id);
        if (!existingManagement) {
            return res.status(400).json({ message: "Management tidak ditemukan!" });
        }

        // Update data Management
        const updatedManagement = await existingManagement.update({
            status: true, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${namaAdmin} (${userUpdate}) menyetujui pembuatan manajemen ${nama}`
        });

        const message = "Management berhasil diperbarui!";
        res.json({ updatedManagement, message });
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}