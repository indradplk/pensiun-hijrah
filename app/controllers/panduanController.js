const Panduan = require('../models/Panduan');
const ActivityAdmin = require('../models/ActivityAdmin');
const { NotFoundError } = require('../errors');
const sanitizeInput = require('../helpers/sanitizeInput');
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

        // filter by categories
        if (kategoriFilter) {
            whereClause.kategori = kategoriFilter;
        }

        const getAllPanduan = await Panduan.findAll({
            where: whereClause,
        });

        if (isEmpty(getAllPanduan)) {
            throw new NotFoundError('Guidelines Not Found!');
        }

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved Guidelines data!',
            content: getAllPanduan,
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
        const { id } = req.params;

        const getPanduan = await Panduan.findByPk(id);

        if (!getPanduan)
            throw new NotFoundError(`Guideline with id: ${id} not found!`);

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved Guideline data!',
            content: getPanduan,
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
        const { title, kategori } = req.body;
        const userUpdate = req.user.username; 

        // Check uploaded document
        if (!req.files || !req.files.path_panduan || !req.files.path_panduan.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload the document!',
            });
        }

        if (!title || !kategori) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Title and category must be filled in!',
            });
        }

        const validCategory = ['peserta', 'iuran', 'klaim', 'pengalihan', 'formulir', 'brosur', 'pojk', 'pdp'];
        if (!validCategory.includes(kategori)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Invalid category!',
            });
        }

        if (sanitizeInput(title)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }
        
        const path_panduan = `${path.relative('../public/panduan', req.files.path_panduan[0].path)}`;
        
        const sanitizedTitle = encode(title);

        // Validate form
        const newPanduan = await Panduan.create({
            title: sanitizedTitle, kategori, path_panduan, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menambahkan panduan ${sanitizedTitle}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Guideline created successfully!',
            content: newPanduan,
        });
    } catch (error) {
        if (req.files && req.files.path_panduan && req.files.path_panduan.length > 0) {
            fs.unlinkSync(req.files.path_panduan[0].path);
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
        const { title, kategori } = req.body;
        const { id } = req.params;
        const userUpdate = req.user.username; 

        // Check if the Guideline with the given ID exists
        const existingPanduan = await Panduan.findByPk(id);
        if (!existingPanduan) {
            throw new NotFoundError(`Guideline not found!`);
        }

        // Check uploaded document
        if (!req.files || !req.files.path_panduan || !req.files.path_panduan.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload the document!',
            });
        }

        if (!title || !kategori) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Title and category must be filled in!',
            });
        }

        const validCategory = ['peserta', 'iuran', 'klaim', 'pengalihan', 'formulir', 'brosur', 'pojk', 'pdp'];
        if (!validCategory.includes(kategori)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Invalid category!',
            });
        }

        if (sanitizeInput(title)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        // Delete old files before updating
        if (existingPanduan.path_panduan) {
            fs.unlinkSync(path.join('../public/panduan', existingPanduan.path_panduan));
        }
        
        const path_panduan = `${path.relative('../public/panduan', req.files.path_panduan[0].path)}`;
        
        const sanitizedTitle = encode(title);

        // Update Guideline data
        const updatedPanduan = await existingPanduan.update({
            title: sanitizedTitle, kategori, path_panduan, status: false, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} memperbarui panduan dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully updated Guideline!',
            content: updatedPanduan,
        });
    } catch (error) {
        if (req.files && req.files.path_panduan && req.files.path_panduan.length > 0) {
            fs.unlinkSync(req.files.path_panduan[0].path);
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
        const { id } = req.params;
        const userUpdate = req.user.username; 

        // Check the Guideline to be deleted
        const PanduanToDelete = await Panduan.findByPk(id);
        if (!PanduanToDelete) {
            throw new NotFoundError(`Guideline not found!`);
        }

        // Delete files from the directory
        if (PanduanToDelete.path_panduan) {
            fs.unlinkSync(path.join('../public/panduan', PanduanToDelete.path_panduan));
        }

        await PanduanToDelete.destroy();

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menghapus panduan dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully deleted Guideline!'
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

        // Check if the document with the given ID exists
        const existingPanduan = await Panduan.findByPk(id);
        if (!existingPanduan) {
            throw new NotFoundError(`Document not found!`);
        }

        // Update data Document
        const updatedPanduan = await existingPanduan.update({
            status: true, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menyetujui pembuatan panduan dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Guideline updated successfully!',
            content: updatedPanduan,
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