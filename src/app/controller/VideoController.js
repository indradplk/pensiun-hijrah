const Video = require('../model/Video')
const ActivityAdmin = require('../model/ActivityAdmin')
const { Op } = require('sequelize');
const { use } = require('../routes/Office');

exports.index = async (req, res) => {
    try {
        const statusFilter = req.query.status;
        const whereClause = {};

        // Jika filter tersedia dan valid, tambahkan filter berdasarkan status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        const getAllVideo = await Video.findAll({
            attributes: ['id', 'title', 'link', 'status'],
            where: whereClause,
        });

        res.json(getAllVideo);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.show = async (req, res) => {
    try {
        const id = req.params.id;
        const getVideo = await Video.findOne({
            where: { id: id },
            attributes: ['id', 'title', 'link', 'status']
        });
        res.json(getVideo);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.create = async (req, res) => {
    try {
        const { title, link, nama, userUpdate } = req.body;

        // Validasi form
        if (!title || !link) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        // Create Video
        const newVideo = await Video.create({
            title, link, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menambahkan video ${title}`
        });

        const message = "Video berhasil dibuat!";
        res.json({ newVideo, message });
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.edit = async (req, res) => {
    try {
        const { title, link, nama, userUpdate } = req.body;
        const id = req.params.id;

        // Cek apakah Video dengan ID yang diberikan ada
        const existingVideo = await Video.findByPk(id);
        if (!existingVideo) {
            return res.status(400).json({ message: "Video tidak ditemukan!" });
        }

        // Validasi form
        if (!title || !link) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        // Update Video
        const editVideo = await existingVideo.update({
            title, link, status: false, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) memperbarui video ${title}`
        });

        const message = "Video berhasil diperbarui!";
        res.json({ editVideo, message });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Terjadi kesalahan server." });
    }
}

exports.delete = async (req, res) => {
    try {
        const id = req.params.id;
        const { nama, userUpdate, title } = req.body;

        // Cari Video yang akan dihapus
        const VideoToDelete = await Video.findByPk(id);
        if (!VideoToDelete) {
            return res.status(400).json({ message: "Video tidak ditemukan!" });
        }

        await VideoToDelete.destroy();

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menghapus video ${title}`
        });

        res.json({message:"Video berhasil dihapus!"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

exports.accept = async (req, res) => {
    try {
        const { nama, userUpdate, title } = req.body;
        const { id } = req.params;

        // Cek apakah Video dengan ID yang diberikan ada
        const existingVideo = await Video.findByPk(id);
        if (!existingVideo) {
            return res.status(400).json({ message: "Video tidak ditemukan!" });
        }

        // Update data Video
        const updatedVideo = await existingVideo.update({
            status: true, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menyetujui pembuatan video ${title}`
        });

        const message = "Video berhasil diperbarui!";
        res.json({ updatedVideo, message });
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}