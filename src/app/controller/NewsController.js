const News = require('../model/News')
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

        const getAllNews = await News.findAll({
            attributes: ['id', 'title', 'seo', 'path_news', 'description', 'kategori', 'status', 'createdAt'],
            where: whereClause,
        });
        res.json(getAllNews);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.show = async (req, res) => {
    try {
        const seo = req.params.seo;
        const getNews = await News.findOne({
            where: { seo: seo },
            attributes: ['id', 'title', 'seo', 'path_news', 'description', 'kategori', 'status', 'createdAt']
        });
        res.json(getNews);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.create = async (req, res) => {
    try {
        const { title, description, kategori, nama, userUpdate } = req.body;

        // Cek apakah gambar diupload
        if (!req.files || !req.files.path_news || !req.files.path_news.length === 0) {
            return res.status(400).json({ message: "Silakan unggah gambar!" });
        }

        if (!title || !description || !kategori) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        const path_news = `${path.relative('../../../html/pensiun-hijrah/public/media/berita', req.files.path_news[0].path)}`;

        const urlJudulBerita = title.toLowerCase().replace(/\s+/g, '-');

        // Validasi form
        const newNews = await News.create({
            title, seo: urlJudulBerita, description, kategori, path_news, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menambahkan Berita ${title}`
        });

        const message = "Berita berhasil dibuat!";
        res.json({ newNews, message });
    } catch (err) {
        if (req.files && req.files.path_news && req.files.path_news.length > 0) {
            fs.unlinkSync(req.files.path_news[0].path);
        }
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.update = async (req, res) => {
    try {
        const { title, description, kategori, nama, userUpdate } = req.body;
        const { id } = req.params;

        // Cek apakah News dengan ID yang diberikan ada
        const existingNews = await News.findByPk(id);
        if (!existingNews) {
            return res.status(400).json({ message: "Berita tidak ditemukan!" });
        }

        // Cek apakah gambar diupload
        if (!req.files || !req.files.path_news || !req.files.path_news.length === 0) {
            return res.status(400).json({ message: "Silakan unggah gambar!" });
        }

        if (!title || !description || !kategori) {
            return res.status(400).json({ message: "Semua field harus diisi!" });
        }

        // Hapus file lama sebelum update
        if (existingNews.path_news) {
            fs.unlinkSync(path.join('../../../html/pensiun-hijrah/public/media/berita', existingNews.path_news));
        }

        const path_news = `${path.relative('../../../html/pensiun-hijrah/public/media/berita', req.files.path_news[0].path)}`;

        const urlJudulBerita = title.toLowerCase().replace(/\s+/g, '-');

        // Update data News
        const updatedNews = await existingNews.update({
            title, seo: urlJudulBerita, description, kategori, path_news, status: false, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) memperbarui Berita ${title}`
        });

        const message = "Berita berhasil diperbarui!";
        res.json({ updatedNews, message });
    } catch (err) {
        if (req.files && req.files.path_news && req.files.path_news.length > 0) {
            fs.unlinkSync(req.files.path_news[0].path);
        }
        console.error(err.message);
        res.status(500).json({ message: "Terjadi kesalahan server." });
    }
}

exports.delete = async (req, res) => {
    try {
        const seo = req.params.seo;
        const { nama, userUpdate, title } = req.body;

        // Cari News yang akan dihapus
        const NewsToDelete = await News.findOne({
            where: { seo: seo }
        });
        
        if (!NewsToDelete) {
            return res.status(400).json({ message: "Berita tidak ditemukan!" });
        }

        // Hapus file dari direktori
        if (NewsToDelete.path_news) {
            fs.unlinkSync(path.join('../../../html/pensiun-hijrah/public/media/berita', NewsToDelete.path_news));
        }

        await NewsToDelete.destroy();

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menghapus Berita ${title}`
        });

        res.json({message:"Berita berhasil dihapus!"});
    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
}

exports.accept = async (req, res) => {
    try {
        const { nama, userUpdate, title } = req.body;
        const { id } = req.params;

        // Cek apakah Berita dengan ID yang diberikan ada
        const existingNews = await News.findByPk(id);
        if (!existingNews) {
            return res.status(400).json({ message: "News tidak ditemukan!" });
        }

        // Update data News
        const updatedNews = await existingNews.update({
            status: true, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) menyetujui pembuatan berita ${title}`
        });

        const message = "Berita berhasil diperbarui!";
        res.json({ updatedNews, message });
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}