const Report = require('../model/Report')
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

        const getAllReport = await Report.findAll({
            attributes: ['id', 'title', 'path_report', 'kategori', 'status'],
            where: whereClause,
        });

        res.json(getAllReport);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.show = async (req, res) => {
    try {
        const id = req.params.id;
        const getReport = await Report.findOne({
            where: { id: id },
            attributes: ['id', 'title', 'path_report', 'kategori', 'status']
        });
        res.json(getReport);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.create = async (req, res) => {
    try {
        const { title, kategori, nama, userUpdate } = req.body;

        // Cek apakah dokumen diupload
        if (!req.files || !req.files.path_report || !req.files.path_report.length === 0) {
            return res.status(400).json({ message: "Silakan unggah dokumen!" });
        }

        if (!title || !kategori) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        const path_report = `${path.relative('../../public/media/laporan', req.files.path_report[0].path)}`;

        // Validasi form
        const newReport = await Report.create({
            title, kategori, path_report, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menambahkan dokumen ${title}`
        });

        const message = "Report berhasil dibuat!";
        res.json({ newReport, message });
    } catch (err) {
        if (req.files && req.files.path_report && req.files.path_report.length > 0) {
            fs.unlinkSync(req.files.path_report[0].path);
        }
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.update = async (req, res) => {
    try {
        const { title, kategori, nama, userUpdate } = req.body;
        const { id } = req.params;

        // Cek apakah Report dengan ID yang diberikan ada
        const existingReport = await Report.findByPk(id);
        if (!existingReport) {
            return res.status(400).json({ message: "Laporan tidak ditemukan!" });
        }

        // Cek apakah dokumen diupload
        if (!req.files || !req.files.path_report || !req.files.path_report.length === 0) {
            return res.status(400).json({ message: "Silakan unggah dokumen!" });
        }

        if (!title || !kategori) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        // Hapus file lama sebelum update
        if (existingReport.path_report) {
            fs.unlinkSync(path.join('../../public/media/laporan', existingReport.path_report));
        }

        const path_report = `${path.relative('../../public/media/laporan', req.files.path_report[0].path)}`;

        // Update data Report
        const updatedReport = await existingReport.update({
            title, kategori, path_report, status: false, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) memperbarui dokumen ${title}`
        });

        const message = "Report berhasil diperbarui!";
        res.json({ updatedReport, message });
    } catch (err) {
        if (req.files && req.files.path_report && req.files.path_report.length > 0) {
            fs.unlinkSync(req.files.path_report[0].path);
        }
        console.error(err.message);
        res.status(500).json({ message: "Terjadi kesalahan server." });
    }
}

exports.delete = async (req, res) => {
    try {
        const id= req.params.id;
        const { nama, userUpdate, title } = req.body;

        // Cari Report yang akan dihapus
        const ReportToDelete = await Report.findByPk(id);
        if (!ReportToDelete) {
            return res.status(400).json({ message: "Data Report tidak ditemukan!" });
        }

        // Hapus file dari direktori
        if (ReportToDelete.path_report) {
            fs.unlinkSync(path.join('../../public/media/laporan', ReportToDelete.path_report));
        }

        await ReportToDelete.destroy();

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menghapus dokumen ${title}`
        });

        res.json({message:"Report berhasil dihapus!"});
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
        const existingReport = await Report.findByPk(id);
        if (!existingReport) {
            return res.status(400).json({ message: "Dokumen Report tidak ditemukan!" });
        }

        // Update data Dokumen Report
        const updatedReport = await existingReport.update({
            status: true, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menyetujui pembuatan dokumen ${title}`
        });

        const message = "Dokumen Report berhasil diperbarui!";
        res.json({ updatedReport, message });
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}