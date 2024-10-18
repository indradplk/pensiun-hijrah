const Management = require('../models/Management');
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
        const role = req.user.role;

        // Validasi role
        if (role !== 'admin') {
            return response(res, {
                code: 403,
                success: false,
                message: 'Access denied!',
            });
        }

        // Validasi input kosong
        if (!nama || !jabatan || !description || !kategori) {
            // Hapus file jika sudah diunggah
            if (req.files && req.files.path_management && req.files.path_management.length > 0) {
                fs.unlinkSync(req.files.path_management[0].path);
            }
            return response(res, {
                code: 400,
                success: false,
                message: 'Name, position, description, and category must be filled in!',
            });
        }

        // Validasi kategori
        const validCategory = ['pengurus', 'pendiri', 'pengawas', 'dps'];
        if (!validCategory.includes(kategori)) {
            // Hapus file jika sudah diunggah
            if (req.files && req.files.path_management && req.files.path_management.length > 0) {
                fs.unlinkSync(req.files.path_management[0].path);
            }
            return response(res, {
                code: 400,
                success: false,
                message: 'Invalid category!',
            });
        }

        // Validasi input nama dan jabatan
        if (sanitizeInput(nama) || sanitizeInput(jabatan)) {
            // Hapus file jika sudah diunggah
            if (req.files && req.files.path_management && req.files.path_management.length > 0) {
                fs.unlinkSync(req.files.path_management[0].path);
            }
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        // Validasi tag <script> atau atribut event HTML dalam deskripsi
        if (containsScriptTag(description) || containsEventAttributes(description)) {
            // Hapus file jika sudah diunggah
            if (req.files && req.files.path_management && req.files.path_management.length > 0) {
                fs.unlinkSync(req.files.path_management[0].path);
            }
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters like <script> or event attributes!',
            });
        }

        // Validasi apakah file diupload
        if (!req.files || !req.files.path_management || req.files.path_management.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload the image!',
            });
        }

        const path_management = `${path.relative('../public/manajemen', req.files.path_management[0].path)}`;

        // Sanitasi input nama dan jabatan
        const sanitizedNama = encode(nama);
        const sanitizedJabatan = encode(jabatan);

        // Menyimpan data manajemen ke database
        const newManagement = await Management.create({
            nama: sanitizedNama,
            jabatan: sanitizedJabatan,
            description,
            kategori,
            path_management,
            userUpdate
        });

        // Menyimpan aktivitas ke log admin
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
        // Hapus file jika ada error
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
};

exports.update = async (req, res) => {
    try {
        const { nama, jabatan, description, kategori } = req.body;
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

        // Check if the Management with the given ID exists
        const existingManagement = await Management.findByPk(id);
        if (!existingManagement) {
            throw new NotFoundError(`Management not found!`);
        }

        // Validasi input kosong
        if (!nama || !jabatan || !description || !kategori) {
            // Hapus file jika sudah diunggah
            if (req.files && req.files.path_management && req.files.path_management.length > 0) {
                fs.unlinkSync(req.files.path_management[0].path);
            }
            return response(res, {
                code: 400,
                success: false,
                message: 'Name, position, description, and category must be filled in!',
            });
        }

        // Validasi kategori
        const validCategory = ['pengurus', 'pendiri', 'pengawas', 'dps'];
        if (!validCategory.includes(kategori)) {
            // Hapus file jika sudah diunggah
            if (req.files && req.files.path_management && req.files.path_management.length > 0) {
                fs.unlinkSync(req.files.path_management[0].path);
            }
            return response(res, {
                code: 400,
                success: false,
                message: 'Invalid category!',
            });
        }

        // Validasi input nama dan jabatan
        if (sanitizeInput(nama) || sanitizeInput(jabatan)) {
            // Hapus file jika sudah diunggah
            if (req.files && req.files.path_management && req.files.path_management.length > 0) {
                fs.unlinkSync(req.files.path_management[0].path);
            }
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        // Validasi tag <script> atau atribut event HTML dalam deskripsi
        if (containsScriptTag(description) || containsEventAttributes(description)) {
            // Hapus file jika sudah diunggah
            if (req.files && req.files.path_management && req.files.path_management.length > 0) {
                fs.unlinkSync(req.files.path_management[0].path);
            }
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters like <script> or event attributes!',
            });
        }

        // Validasi apakah file diupload
        if (!req.files || !req.files.path_management || req.files.path_management.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload the image!',
            });
        }

        // Delete old files before updating
        if (existingManagement.path_management) {
            fs.unlinkSync(path.join('../public/manajemen', existingManagement.path_management));
        }

        const path_management = `${path.relative('../public/manajemen', req.files.path_management[0].path)}`;

        const sanitizedNama = encode(nama);
        const sanitizedJabatan = encode(jabatan);

        // Update data Management
        const updatedManagement = await existingManagement.update({
            nama: sanitizedNama, jabatan: sanitizedJabatan, description, kategori, status: false, path_management, userUpdate
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
        const role = req.user.role;
        
        if (role !== 'admin') { 
          return response(res, {
            code: 403,
            success: false,
            message: 'Access denied!',
          });
        }

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