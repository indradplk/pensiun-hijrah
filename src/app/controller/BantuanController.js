const Bantuan = require('../model/Bantuan')
const ActivityAdmin = require('../model/ActivityAdmin')
const { Op } = require('sequelize')
const path = require('path')
const fs = require('fs')

exports.index = async (req, res) => {
    try {
        const statusFilter = req.query.status;
        const kategoriFilter = req.query.kategori;
        const whereClause = {};

        // Jika filter tersedia dan valid, tambahkan filter berdasarkan status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        // Jika filter kategori tersedia, tambahkan filter berdasarkan kategori
        if (kategoriFilter) {
            whereClause.kategori = kategoriFilter;
        }

        const getAllBantuan = await Bantuan.findAll({
            attributes: ['id', 'title', 'path_bantuan', 'kategori', 'status'],
            where: whereClause,
        });

        res.json(getAllBantuan);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.show = async (req, res) => {
    try {
        const id = req.params.id;
        const getBantuan = await Bantuan.findOne({
            where: { id: id },
            attributes: ['id', 'title', 'path_bantuan', 'kategori', 'status']
        });
        res.json(getBantuan);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.create = async (req, res) => {
    try {
        const { title, kategori, nama, userUpdate } = req.body;

        // Cek apakah dokumen diupload
        if (!req.files || !req.files.path_bantuan || !req.files.path_bantuan.length === 0) {
            return res.status(400).json({ message: "Silakan unggah dokumen!" });
        }

        if (!title || !kategori) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        const path_bantuan = `${path.relative('../../../html/pensiun-hijrah/public/bantuan/panduan', req.files.path_bantuan[0].path)}`;

        // Validasi form
        const newBantuan = await Bantuan.create({
            title, kategori, path_bantuan, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menambahkan dokumen ${title}`
        });

        const message = "Dokumen Bantuan berhasil dibuat!";
        res.json({ newBantuan, message });
    } catch (err) {
        if (req.files && req.files.path_bantuan && req.files.path_bantuan.length > 0) {
            fs.unlinkSync(req.files.path_bantuan[0].path);
        }
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.update = async (req, res) => {
    try {
        const { title, kategori, nama, userUpdate } = req.body;
        const { id } = req.params;

        // Cek apakah Bantuan dengan ID yang diberikan ada
        const existingBantuan = await Bantuan.findByPk(id);
        if (!existingBantuan) {
            return res.status(400).json({ message: "Dokumen Bantuan tidak ditemukan!" });
        }

        // Cek apakah dokumen diupload
        if (!req.files || !req.files.path_bantuan || !req.files.path_bantuan.length === 0) {
            return res.status(400).json({ message: "Silakan unggah dokumen!" });
        }

        if (!title || !kategori) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        // Hapus file lama sebelum update
        if (existingBantuan.path_bantuan) {
            fs.unlinkSync(path.join('../../../html/pensiun-hijrah/public/bantuan/panduan', existingBantuan.path_bantuan));
        }

        const path_bantuan = `${path.relative('../../../html/pensiun-hijrah/public/bantuan/panduan', req.files.path_bantuan[0].path)}`;

        // Update data Bantuan
        const updatedBantuan = await existingBantuan.update({
            title, kategori, path_bantuan, status: false, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) memperbarui dokumen ${title}`
        });

        const message = "Dokumen Bantuan berhasil diperbarui!";
        res.json({ updatedBantuan, message });
    } catch (err) {
        if (req.files && req.files.path_bantuan && req.files.path_bantuan.length > 0) {
            fs.unlinkSync(req.files.path_bantuan[0].path);
        }
        console.error(err.message);
        res.status(500).json({ message: "Terjadi kesalahan server." });
    }
}

exports.delete = async (req, res) => {
    try {
        const id= req.params.id;
        const { nama, userUpdate, title } = req.body;

        // Cari Bantuan yang akan dihapus
        const BantuanToDelete = await Bantuan.findByPk(id);
        if (!BantuanToDelete) {
            return res.status(400).json({ message: "Data Dokumen Bantuan tidak ditemukan!" });
        }

        // Hapus file dari direktori
        if (BantuanToDelete.path_bantuan) {
            fs.unlinkSync(path.join('../../../html/pensiun-hijrah/public/bantuan/panduan', BantuanToDelete.path_bantuan));
        }

        await BantuanToDelete.destroy();

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menghapus dokumen ${title}`
        });

        res.json({message:"Dokumen Bantuan berhasil dihapus!"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

exports.accept = async (req, res) => {
    try {
        const { nama, userUpdate, title } = req.body;
        const { id } = req.params;

        // Cek apakah Dokumen dengan ID yang diberikan ada
        const existingBantuan = await Bantuan.findByPk(id);
        if (!existingBantuan) {
            return res.status(400).json({ message: "Bantuan tidak ditemukan!" });
        }

        // Update data Dokumen Bantuan
        const updatedBantuan = await existingBantuan.update({
            status: true, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menyetujui pembuatan dokumen ${title}`
        });

        const message = "Dokumen Bantuan berhasil diperbarui!";
        res.json({ updatedBantuan, message });
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}