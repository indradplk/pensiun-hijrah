const Management = require('../models/Management');
const ActivityAdmin = require('../models/ActivityAdmin');
const { NotFoundError } = require('../errors');
const sanitizeInput = require('../helpers/sanitizeInput');
const { response, isEmpty } = require('../helpers/bcrypt');
const path = require('path');
const fs = require('fs');
const { encode } = require('html-entities');
const sanitizeHtml = require('sanitize-html');

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

        const getAllManagement = await Management.findAll({
            where: whereClause,
        });

        if (isEmpty(getAllManagement)) {
            throw new NotFoundError('Managements Not Found!');
        }

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved Managements data!',
            content: getAllManagement,
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

        const getManagement = await Management.findByPk(id);

        if (!getManagement)
            throw new NotFoundError(`Management with id: ${id} not found!`);
        
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved Management data!',
            content: getManagement,
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
        const { nama, jabatan, description, kategori } = req.body;
        const userUpdate = req.user.username; 

        // Check uploaded image
        if (!req.files || !req.files.path_management || req.files.path_management.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload the image!',
            });
        }

        if (!nama || !jabatan || !description || !kategori) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Name, position, description, and category must be filled in!',
            });
        }

        const validCategory = ['pengurus', 'pendiri', 'pengawas', 'dps'];
        if (!validCategory.includes(kategori)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Invalid category!',
            });
        }

        if (sanitizeInput(nama) || sanitizeInput(jabatan)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        const sanitizedDescription = sanitizeHtml(description, {
            allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'blockquote' ],
            allowedAttributes: {
                'a': [ 'href', 'name', 'target' ]
            },
            allowedSchemes: [ 'http', 'https', 'mailto' ]
        });

        const path_management = `${path.relative('../public/manajemen', req.files.path_management[0].path)}`;

        const sanitizedNama = encode(nama);
        const sanitizedJabatan = encode(jabatan);

        // Validate form
        const newManagement = await Management.create({
            nama: sanitizedNama, jabatan: sanitizedJabatan, description: sanitizedDescription, kategori, path_management, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menambahkan manajemen ${sanitizedNama}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Management created successfully!',
            content: newManagement,
        });
    } catch (error) {
        if (req.files && req.files.path_management && req.files.path_management.length > 0) {
            fs.unlinkSync(req.files.path_management[0].path);
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
        const { nama, jabatan, description, kategori } = req.body;
        const { id } = req.params;
        const userUpdate = req.user.username; 

        // Check if the Management with the given ID exists
        const existingManagement = await Management.findByPk(id);
        if (!existingManagement) {
            throw new NotFoundError(`Management not found!`);
        }

        // Check uploaded image
        if (!req.files || !req.files.path_management || req.files.path_management.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload the image!',
            });
        }

        if (!nama || !jabatan || !description || !kategori) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Name, position, description, and category must be filled in!',
            });
        }

        const validCategory = ['pengurus', 'pendiri', 'pengawas', 'dps'];
        if (!validCategory.includes(kategori)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Invalid category!',
            });
        }

        if (sanitizeInput(nama) || sanitizeInput(jabatan)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        const sanitizedDescription = sanitizeHtml(description, {
            allowedTags: [ 'b', 'i', 'em', 'strong', 'a', 'p', 'h1', 'h2', 'h3', 'ul', 'ol', 'li', 'blockquote' ],
            allowedAttributes: {
                'a': [ 'href', 'name', 'target' ]
            },
            allowedSchemes: [ 'http', 'https', 'mailto' ]
        });

        // Delete old files before updating
        if (existingManagement.path_management) {
            fs.unlinkSync(path.join('../public/manajemen', existingManagement.path_management));
        }

        const path_management = `${path.relative('../public/manajemen', req.files.path_management[0].path)}`;

        const sanitizedNama = encode(nama);
        const sanitizedJabatan = encode(jabatan);

        // Update data Management
        const updatedManagement = await existingManagement.update({
            nama: sanitizedNama, jabatan: sanitizedJabatan, description: sanitizedDescription, kategori, status: false, path_management, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} memperbarui manajemen dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully updated Management!',
            content: updatedManagement,
        });
    } catch (error) {
        if (req.files && req.files.path_management && req.files.path_management.length > 0) {
            fs.unlinkSync(req.files.path_management[0].path);
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
        // Check the Management to be deleted
        const ManagementToDelete = await Management.findByPk(id);

        if (!ManagementToDelete) {
            throw new NotFoundError(`Management not found!`);
        }

        // Delete files from the directory
        if (ManagementToDelete.path_management) {
            fs.unlinkSync(path.join('../public/manajemen', ManagementToDelete.path_management));
        }

        await ManagementToDelete.destroy();

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menghapus manajemen dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully deleted Management!'
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

        // Check if the Management with the given ID exists
        const existingManagement = await Management.findByPk(id);

        if (!existingManagement) {
            throw new NotFoundError(`Management not found!`);
        }

        // Update data Management
        const updatedManagement = await existingManagement.update({
            status: true, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menyetujui pembuatan manajemen dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Management updated successfully!',
            content: updatedManagement,
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