const Slider = require('../model/Slider')
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

        const getAllSlider = await Slider.findAll({
            attributes: ['id', 'judul', 'path_web', 'path_mobile', 'status'],
            where: whereClause,
        });
        res.json(getAllSlider);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.show = async (req, res) => {
    try {
        const id = req.params.id;
        const getSlider = await Slider.findOne({
            where: { id: id },
            attributes: ['id', 'judul', 'path_web', 'path_mobile', 'status']
        });
        res.json(getSlider);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.create = async (req, res) => {
    try {
        const { judul, nama, userUpdate } = req.body;

        // Cek apakah kedua gambar diupload
        if (!req.files || !req.files.path_web || req.files.path_web.length === 0 || !req.files.path_mobile || req.files.path_mobile.length === 0) {
            return res.status(400).json({ message: "Silakan unggah kedua gambar!" });
        }

        if (!judul) {
            return res.status(400).json({ message: "Judul harus diisi!" });
        }

        const path_web = `slider/${path.relative('../../public/slider', req.files.path_web[0].path)}`;
        const path_mobile = `slider/${path.relative('../../public/slider', req.files.path_mobile[0].path)}`;

        // Validasi form
        const newSlider = await Slider.create({
            judul, path_web, path_mobile, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menambahkan slider ${judul}`
        });

        const message = "Slider berhasil dibuat!";
        res.json({ newSlider, message });
    } catch (err) {
        if (req.files && req.files.path_web && req.files.path_web.length > 0) {
            fs.unlinkSync(req.files.path_web[0].path);
        }
        if (req.files && req.files.path_mobile && req.files.path_mobile.length > 0) {
            fs.unlinkSync(req.files.path_mobile[0].path);
        }
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.update = async (req, res) => {
    try {
        const { judul, nama, userUpdate } = req.body;
        const { id } = req.params;

        // Cek apakah slider dengan ID yang diberikan ada
        const existingSlider = await Slider.findByPk(id);
        if (!existingSlider) {
            return res.status(400).json({ message: "Slider tidak ditemukan!" });
        }

        // Cek apakah kedua gambar diupload
        if (!req.files || !req.files.path_web || req.files.path_web.length === 0 || !req.files.path_mobile || req.files.path_mobile.length === 0) {
            return res.status(400).json({ message: "Silakan unggah kedua gambar!" });
        }

        if (!judul) {
            return res.status(400).json({ message: "Field harus diisi!" });
        }

        // Hapus file lama sebelum update
        if (existingSlider.path_web) {
            fs.unlinkSync(path.join('../../public', existingSlider.path_web));
        }
        if (existingSlider.path_mobile) {
            fs.unlinkSync(path.join('../../public', existingSlider.path_mobile));
        }

        const path_web = `slider/${path.relative('../../public/slider', req.files.path_web[0].path)}`;
        const path_mobile = `slider/${path.relative('../../public/slider', req.files.path_mobile[0].path)}`;

        // Update data slider
        const updatedSlider = await existingSlider.update({
            judul, path_web, path_mobile, status: false, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) memperbarui slider ${judul}`
        });

        const message = "Slider berhasil diperbarui!";
        res.json({ updatedSlider, message });
    } catch (err) {
        if (req.files && req.files.path_web && req.files.path_web.length > 0) {
            fs.unlinkSync(req.files.path_web[0].path);
        }
        if (req.files && req.files.path_mobile && req.files.path_mobile.length > 0) {
            fs.unlinkSync(req.files.path_mobile[0].path);
        }
        console.error(err.message);
        res.status(500).json({ message: "Terjadi kesalahan server." });
    }
}

exports.delete = async (req, res) => {
    try {
        const id= req.params.id;
        const { nama, userUpdate, judul } = req.body;

        // Cari slider yang akan dihapus
        const sliderToDelete = await Slider.findByPk(id);
        if (!sliderToDelete) {
            return res.status(400).json({ message: "Data Slider tidak ditemukan!" });
        }

        // Hapus file dari direktori
        if (sliderToDelete.path_web) {
            fs.unlinkSync(path.join('../../public', sliderToDelete.path_web));
        }
        if (sliderToDelete.path_mobile) {
            fs.unlinkSync(path.join('../../public', sliderToDelete.path_mobile));
        }

        await sliderToDelete.destroy();

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menghapus slider ${judul}`
        });

        res.json({message:"Slider berhasil dihapus!"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

exports.accept = async (req, res) => {
    try {
        const { nama, userUpdate, judul } = req.body;
        const { id } = req.params;

        // Cek apakah Slider dengan ID yang diberikan ada
        const existingSlider = await Slider.findByPk(id);
        if (!existingSlider) {
            return res.status(400).json({ message: "Slider tidak ditemukan!" });
        }

        // Update data Slider
        const updatedSlider = await existingSlider.update({
            status: true, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menyetujui pembuatan slider ${judul}`
        });

        const message = "Slider berhasil diperbarui!";
        res.json({ updatedSlider, message });
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}