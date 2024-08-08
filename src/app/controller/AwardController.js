const Award = require('../model/Award')
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

        const getAllAward = await Award.findAll({
            attributes: ['id', 'path_award', 'description', 'status'],
            where: whereClause,
        });
        res.json(getAllAward);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.show = async (req, res) => {
    try {
        const id = req.params.id;
        const getAward = await Award.findOne({
            where: { id: id, status: true },
            attributes: ['id', 'path_award', 'description']
        });
        res.json(getAward);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.create = async (req, res) => {
    try {
        const { description, nama, userUpdate } = req.body;

        // Cek apakah gambar diupload
        if (!req.files || !req.files.path_award || req.files.path_award.length === 0) {
            return res.status(400).json({ message: "Silakan unggah gambar!" });
        }

        if (!description) {
            return res.status(400).json({ message: "Deskripsi harus diisi!" });
        }

        const path_award = `${path.relative('../../../html/pensiun-hijrah/public/about/penghargaan', req.files.path_award[0].path)}`;

        // Validasi form
        const newAward = await Award.create({
            path_award, description, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menambahkan award ${description}`
        });

        const message = "Award berhasil dibuat!";
        res.json({ newAward, message });
    } catch (err) {
        if (req.files && req.files.path_award && req.files.path_award.length > 0) {
            fs.unlinkSync(req.files.path_award[0].path);
        }
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.update = async (req, res) => {
    try {
        const { description, nama, userUpdate } = req.body;
        const { id } = req.params;

        // Cek apakah Award dengan ID yang diberikan ada
        const existingAward = await Award.findByPk(id);
        if (!existingAward) {
            return res.status(400).json({ message: "Award tidak ditemukan!" });
        }

        // Cek apakah gambar diupload
        if (!req.files || !req.files.path_award || req.files.path_award.length === 0) {
            return res.status(400).json({ message: "Silakan unggah gambar!" });
        }

        if (!description) {
            return res.status(400).json({ message: "Deskripsi harus diisi!" });
        }

        // Hapus file lama sebelum update
        if (existingAward.path_award) {
            fs.unlinkSync(path.join('../../../html/pensiun-hijrah/public/about/penghargaan', existingAward.path_award));
        }

        const path_award = `${path.relative('../../../html/pensiun-hijrah/public/about/penghargaan', req.files.path_award[0].path)}`;

        // Update data Award
        const updatedAward = await existingAward.update({
            path_award, description, status: false, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) memperbarui award ${description}`
        });

        const message = "Award berhasil diperbarui!";
        res.json({ updatedAward, message });
    } catch (err) {
        if (req.files && req.files.path_award && req.files.path_award.length > 0) {
            fs.unlinkSync(req.files.path_award[0].path);
        }
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.delete = async (req, res) => {
    try {
        const id= req.params.id;
        const { nama, userUpdate, description } = req.body;

        // Cari award yang akan dihapus
        const awardToDelete = await Award.findByPk(id);
        if (!awardToDelete) {
            return res.status(400).json({ message: "Data Award tidak ditemukan!" });
        }

        // Hapus file dari direktori
        if (awardToDelete.path_award) {
            fs.unlinkSync(path.join('../../../html/pensiun-hijrah/public/about/penghargaan', awardToDelete.path_award));
        }

        await awardToDelete.destroy();

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menghapus award ${description}`
        });

        res.json({message:"Award berhasil dihapus!"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

exports.accept = async (req, res) => {
    try {
        const { nama, userUpdate, description } = req.body;
        const { id } = req.params;

        // Cek apakah Award dengan ID yang diberikan ada
        const existingAward = await Award.findByPk(id);
        if (!existingAward) {
            return res.status(400).json({ message: "Award tidak ditemukan!" });
        }

        // Update data Award
        const updatedAward = await existingAward.update({
            status: true, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menyetujui pembuatan award ${description}`
        });

        const message = "Award berhasil diperbarui!";
        res.json({ updatedAward, message });
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}