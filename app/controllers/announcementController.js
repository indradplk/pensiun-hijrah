const Announcement = require('../models/Announcement');
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
        const whereClause = {};

        // filter by status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        const getAllAnnouncement = await Announcement.findAll({
            where: whereClause,
        });

        if (isEmpty(getAllAnnouncement)) {
            throw new NotFoundError('Announcement Not Found!');
        }
        
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved Announcement data!',
            content: getAllAnnouncement,
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

        const getAnnouncement = await Announcement.findOne({
            where: { seo: seo },
        });

        if (!getAnnouncement)
            throw new NotFoundError(`Announcement with seo: ${seo} not found!`);

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved Announcement data!',
            content: getAnnouncement,
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
        const { title, description } = req.body;
        const userUpdate = req.user.username;    
        const role = req.user.role;     

        // Check if the admin with the role administrator
        const admin = await User.findOne({ where: { username: userUpdate } });
        const userAdmin = await Admin.findOne({ where: { id: admin.adminId } });
    
        // Only allow administrator to unblock account
        if (role === 'admin') { 
          if (userAdmin.role !== 'operator' && userAdmin.role !== 'supervisor') { 
            return response(res, {
                code: 403,
                success: false,
                message: 'Access denied!',
            });
          }
        } else {
            return response(res, {
                code: 403,
                success: false,
                message: 'Access denied!',
            });
        }

        if (!title || !description) {
            // Hapus file jika sudah diunggah
            deleteUploadedFiles(req.files);
            return response(res, {
                code: 400,
                success: false,
                message: 'Title and description must be filled in!',
            });
        }

        if (sanitizeInput(title) || sanitizeInput(description)) {
            // Hapus file jika sudah diunggah
            deleteUploadedFiles(req.files);
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        // Check uploaded image
        if (!req.files || !req.files.path_announcement || req.files.path_announcement.length === 0) {
            deleteUploadedFiles(req.files);
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload the image!',
            });
        }

        // Check uploaded document
        const document = req.files && req.files.document && req.files.document.length > 0 
            ? path.relative('../public/pengumuman', req.files.document[0].path)
            : null;

        if (req.files && req.files.document && req.files.document.length > 0) {
            const document = `${path.relative('../public/pengumuman', req.files.document[0].path)}`;
        }
        
        const path_announcement = `${path.relative('../public/pengumuman', req.files.path_announcement[0].path)}`;

        const urlJudulPengumuman = title.toLowerCase().replace(/\s+/g, '-');
        const sanitizedTitle = encode(title);
        const sanitizedDescription = encode(description);

        // Validate form
        const newAnnouncement = await Announcement.create({
            title: sanitizedTitle, seo: urlJudulPengumuman, description: sanitizedDescription, path_announcement, document, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menambahkan pengumuman ${sanitizedTitle}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Announcement created successfully!',
            content: newAnnouncement,
        });
    } catch (error) {
        deleteUploadedFiles(req.files);
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
        const { title, description } = req.body;
        const { id } = req.params;
        const userUpdate = req.user.username;      
        const role = req.user.role;     

        // Check if the admin with the role administrator
        const admin = await User.findOne({ where: { username: userUpdate } });
        const userAdmin = await Admin.findOne({ where: { id: admin.adminId } });
    
        // Only allow administrator to unblock account
        if (role === 'admin') { 
          if (userAdmin.role !== 'operator' && userAdmin.role !== 'supervisor') { 
            return response(res, {
              code: 403,
              success: false,
              message: 'Access denied!',
            });
          }
        } else {
          return response(res, {
            code: 403,
            success: false,
            message: 'Access denied!',
          });
        }

        // Check if the Announcement with the given ID exists
        const existingAnnouncement = await Announcement.findByPk(id);
        if (!existingAnnouncement) {
            throw new NotFoundError(`Announcement not found!`);
        }

        if (!title || !description) {
            // Hapus file jika sudah diunggah
            deleteUploadedFiles(req.files);
            return response(res, {
                code: 400,
                success: false,
                message: 'Title and description must be filled in!',
            });
        }

        if (sanitizeInput(title) || sanitizeInput(description)) {
            // Hapus file jika sudah diunggah
            deleteUploadedFiles(req.files);
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        // Check uploaded image
        if (!req.files || !req.files.path_announcement || req.files.path_announcement.length === 0) {
            deleteUploadedFiles(req.files);
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload the image!',
            });
        }

        // Check uploaded document
        const document = req.files && req.files.document && req.files.document.length > 0 
            ? path.relative('../public/pengumuman', req.files.document[0].path)
            : null;

        // Delete old files before updating
        if (existingAnnouncement.path_announcement) {
            fs.unlinkSync(path.join('../public/pengumuman', existingAnnouncement.path_announcement));
        }

        if (existingAnnouncement.document) {
            fs.unlinkSync(path.join('../public/pengumuman', existingAnnouncement.document));
        }

        const path_announcement = `${path.relative('../public/pengumuman', req.files.path_announcement[0].path)}`;

        const urlJudulPengumuman = title.toLowerCase().replace(/\s+/g, '-');
        const sanitizedTitle = encode(title);
        const sanitizedDescription = encode(description);

        // Update data Announcement
        const updatedAnnouncement = await existingAnnouncement.update({
            title: sanitizedTitle, seo: urlJudulPengumuman, description: sanitizedDescription, document, path_announcement, status: false, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} memperbarui pengumuman dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully updated Announcement!',
            content: updatedAnnouncement,
        });
    } catch (error) {
        deleteUploadedFiles(req.files);
        
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

        // Check if the admin with the role administrator
        const admin = await User.findOne({ where: { username: userUpdate } });
        const userAdmin = await Admin.findOne({ where: { id: admin.adminId } });
    
        // Only allow administrator to unblock account
        if (role === 'admin') { 
          if (userAdmin.role !== 'operator' && userAdmin.role !== 'supervisor') { 
            return response(res, {
              code: 403,
              success: false,
              message: 'Access denied!',
            });
          }
        } else {
          return response(res, {
            code: 403,
            success: false,
            message: 'Access denied!',
          });
        }

        // Check the Announcement to be deleted
        const AnnouncementToDelete = await Announcement.findByPk(id);
        
        if (!AnnouncementToDelete) {
            throw new NotFoundError(`Announcement not found!`);
        }

        // Delete files from the directory
        if (AnnouncementToDelete.path_announcement) {
            fs.unlinkSync(path.join('../public/pengumuman', AnnouncementToDelete.path_announcement));
        }

        await AnnouncementToDelete.destroy();

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menghapus pengumuman dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully deleted Announcement!'
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

        // Check if the admin with the role administrator
        const admin = await User.findOne({ where: { username: userUpdate } });
        const userAdmin = await Admin.findOne({ where: { id: admin.adminId } });
    
        // Only allow administrator to unblock account
        if (role === 'admin') { 
          if (userAdmin.role !== 'supervisor') { 
            return response(res, {
              code: 403,
              success: false,
              message: 'Access denied!',
            });
          }
        } else {
          return response(res, {
            code: 403,
            success: false,
            message: 'Access denied!',
          });
        }

        // Check if the Announcement with the given ID exists
        const existingAnnouncement = await Announcement.findByPk(id);
        if (!existingAnnouncement) {
            throw new NotFoundError(`Announcement not found!`);
        }

        // Update data Announcement
        const updatedAnnouncement = await existingAnnouncement.update({
            status: true, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menyetujui pembuatan pengumuman dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Announcement updated successfully!',
            content: updatedAnnouncement,
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

function deleteUploadedFiles(files) {
    if (files) {
        if (files.path_announcement && files.path_announcement.length > 0) {
            fs.unlinkSync(files.path_announcement[0].path);
        }
        if (files.document && files.document.length > 0) {
            fs.unlinkSync(files.document[0].path);
        }
    }
}