const News = require('../models/News');
const { User, Admin } = require('../models');
const ActivityAdmin = require('../models/ActivityAdmin');
const { NotFoundError } = require('../errors');
const { sanitizeInput, containsEventAttributes, containsScriptTag } = require('../helpers/sanitizeInput');
const { response, isEmpty } = require('../helpers/bcrypt');
const path = require('path');
const fs = require('fs');
const { encode } = require('html-entities');

exports.getAll = async (req, res) => {
    try {
        const statusFilter = req.query.status;
        const kategoriFilter = req.query.kategori;
        const whereClause = {};

        // filter by status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        // filter by category
        if (kategoriFilter) {
            whereClause.kategori = kategoriFilter;
        }

        const getAllNews = await News.findAll({
            where: whereClause,
        });

        if (isEmpty(getAllNews)) {
            throw new NotFoundError('News Not Found!');
        }
        
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved News data!',
            content: getAllNews,
        });
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return response(res, {
                code: 404,
                success: false,
                message: error.message,
            });
        }

        return response(res, {
            code: 500,
            success: false,
            message: error.message || 'Something went wrong!',
            content: error,
        });
    }
}

exports.getOne = async (req, res) => {
    try {
        const seo = req.params.seo;

        const getNews = await News.findOne({
            where: { seo: seo },
        });

        if (!getNews)
            throw new NotFoundError(`News with seo: ${seo} not found!`);

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved News data!',
            content: getNews,
        });
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return response(res, {
              code: 404,
              success: false,
              message: error.message,
            });
        }

        return response(res, {
            code: 500,
            success: false,
            message: error.message || 'Something went wrong!',
            content: error,
        });
    }
}

exports.create = async (req, res) => {
    try {
        const { title, description, kategori } = req.body;
        const userUpdate = req.user.username;  
        const role = req.user.role;
        
        if (role !== 'admin') { 
          return response(res, {
            code: 403,
            success: false,
            message: 'Access denied!',
          });
        }

        if (!title || !description || !kategori) {
            // Hapus file jika sudah diunggah
            if (req.files && req.files.path_news && req.files.path_news.length > 0) {
                fs.unlinkSync(req.files.path_news[0].path);
            }
            return response(res, {
                code: 400,
                success: false,
                message: 'Title, description, and category must be filled in!',
            });
        }

        const validCategory = ['artikel', 'berita'];
        if (!validCategory.includes(kategori)) {
            // Hapus file jika sudah diunggah
            if (req.files && req.files.path_news && req.files.path_news.length > 0) {
                fs.unlinkSync(req.files.path_news[0].path);
            }
            return response(res, {
                code: 400,
                success: false,
                message: 'Invalid category!',
            });
        }

        if (sanitizeInput(title)) {
            // Hapus file jika sudah diunggah
            if (req.files && req.files.path_news && req.files.path_news.length > 0) {
                fs.unlinkSync(req.files.path_news[0].path);
            }
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        if (containsScriptTag(description) || containsEventAttributes(description)) {
            // Hapus file jika sudah diunggah
            if (req.files && req.files.path_news && req.files.path_news.length > 0) {
                fs.unlinkSync(req.files.path_news[0].path);
            }
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters like <script> or event attributes!',
            });
        }

        // Check uploaded image
        if (!req.files || !req.files.path_news || !req.files.path_news.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload the image!',
            });
        }

        const path_news = `${path.relative('../public/berita', req.files.path_news[0].path)}`;

        const urlJudulBerita = title.toLowerCase().replace(/\s+/g, '-');
        const sanitizedTitle = encode(title);

        // Validate form
        const newNews = await News.create({
            title: sanitizedTitle, seo: urlJudulBerita, description, kategori, path_news, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menambahkan berita ${sanitizedTitle}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'News created successfully!',
            content: newNews,
        });
    } catch (error) {
        if (req.files && req.files.path_news && req.files.path_news.length > 0) {
            fs.unlinkSync(req.files.path_news[0].path);
        }
        return response(res, {
            code: 500,
            success: false,
            message: error.message || 'Something went wrong!',
            content: error,
        });
    }
}

exports.update = async (req, res) => {
    try {
        const { title, description, kategori } = req.body;
        const { id } = req.params;
        const userUpdate = req.user.username;  
        const role = req.user.role;
        
        if (role !== 'admin') { 
          return response(res, {
            code: 403,
            success: false,
            message: 'Access denied!',
          });
        }

        // Check if the News with the given ID exists
        const existingNews = await News.findByPk(id);
        if (!existingNews) {
            throw new NotFoundError(`News not found!`);
        }

        if (!title || !description || !kategori) {
            // Hapus file jika sudah diunggah
            if (req.files && req.path_news && req.path_news.length > 0) {
                fs.unlinkSync(req.path_news[0].path);
            }
            return response(res, {
                code: 400,
                success: false,
                message: 'Title, description, and category must be filled in!',
            });
        }

        const validCategory = ['artikel', 'berita'];
        if (!validCategory.includes(kategori)) {
            // Hapus file jika sudah diunggah
            if (req.files && req.files.path_news && req.files.path_news.length > 0) {
                fs.unlinkSync(req.files.path_news[0].path);
            }
            return response(res, {
                code: 400,
                success: false,
                message: 'Invalid category!',
            });
        }

        if (sanitizeInput(title)) {
            // Hapus file jika sudah diunggah
            if (req.files && req.files.path_news && req.files.path_news.length > 0) {
                fs.unlinkSync(req.files.path_news[0].path);
            }
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        if (containsScriptTag(description) || containsEventAttributes(description)) {
            // Hapus file jika sudah diunggah
            if (req.files && req.files.path_news && req.files.path_news.length > 0) {
                fs.unlinkSync(req.files.path_news[0].path);
            }
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters like <script> or event attributes!',
            });
        }

        // Check uploaded image
        if (!req.files || !req.files.path_news || !req.files.path_news.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload the image!',
            });
        }

        // Delete old files before updating
        if (existingNews.path_news) {
            fs.unlinkSync(path.join('../public/berita', existingNews.path_news));
        }

        const path_news = `${path.relative('../public/berita', req.files.path_news[0].path)}`;

        const urlJudulBerita = title.toLowerCase().replace(/\s+/g, '-');
        const sanitizedTitle = encode(title);

        // Update data News
        const updatedNews = await existingNews.update({
            title: sanitizedTitle, seo: urlJudulBerita, description, kategori, path_news, status: false, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} memperbarui berita dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully updated News!',
            content: updatedNews,
        });
    } catch (error) {
        if (req.files && req.files.path_news && req.files.path_news.length > 0) {
            fs.unlinkSync(req.files.path_news[0].path);
        }
        
        if (error.name === 'NotFoundError') {
            return response(res, {
              code: 404,
              success: false,
              message: error.message,
            });
        }

        return response(res, {
            code: 500,
            success: false,
            message: error.message || 'Something went wrong!',
            content: error,
        });
    }
}

exports.delete = async (req, res) => {
    try {
        const userUpdate = req.user.username; 
        const { id } = req.params; 
        const role = req.user.role;
        
        if (role !== 'admin') { 
          return response(res, {
            code: 403,
            success: false,
            message: 'Access denied!',
          });
        }

        // Check the News to be deleted
        const NewsToDelete = await News.findByPk(id);
        
        if (!NewsToDelete) {
            throw new NotFoundError(`News not found!`);
        }

        // Delete files from the directory
        if (NewsToDelete.path_news) {
            fs.unlinkSync(path.join('../public/berita', NewsToDelete.path_news));
        }

        await NewsToDelete.destroy();

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menghapus berita dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully deleted News!'
        });
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return response(res, {
              code: 404,
              success: false,
              message: error.message,
            });
        }

        return response(res, {
            code: 500,
            success: false,
            message: error.message || 'Something went wrong!',
            content: error,
        });
    }
}

exports.accept = async (req, res) => {
    try {
        const { id } = req.params;
        const userUpdate = req.user.username; 
        const role = req.user.role;
        
        if (role !== 'admin') { 
          return response(res, {
            code: 403,
            success: false,
            message: 'Access denied!',
          });
        }

        // Check if the admin with the role supervisor
        const user = await User.findOne({ where: { username: userUpdate } });
        if (!user) {
            return response(res, {
                code: 404,
                success: false,
                message: 'You are not authorized to approve data!',
            });
        }

        const userAdmin = await Admin.findOne({ where: { id: user.adminId } });
        if (!userAdmin) {
            return response(res, {
                code: 404,
                success: false,
                message: 'You are not authorized to approve data!',
            });
        }

        if (userAdmin.role !== 'supervisor') {
            return response(res, {
                code: 403,
                success: false,
                message: 'You are not authorized to approve data!',
            });
        }

        // Check if the News with the given ID exists
        const existingNews = await News.findByPk(id);
        if (!existingNews) {
            throw new NotFoundError(`News not found!`);
        }

        // Update data News
        const updatedNews = await existingNews.update({
            status: true, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menyetujui pembuatan berita dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'News updated successfully!',
            content: updatedNews,
        });
    } catch (error) {
        if (error.name === 'NotFoundError') {
            return response(res, {
              code: 404,
              success: false,
              message: error.message,
            });
        }

        return response(res, {
            code: 500,
            success: false,
            message: error.message || 'Something went wrong!',
            content: error,
        });
    }
}