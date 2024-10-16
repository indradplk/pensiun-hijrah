const Slider = require('../models/Slider');
const { User, Admin } = require('../models');
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
        const whereClause = {};

        // filter by status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        const getAllSlider = await Slider.findAll({
            where: whereClause,
        });

        if (isEmpty(getAllSlider)) {
            throw new NotFoundError('Sliders Not Found!');
        }

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved sliders data!',
            content: getAllSlider,
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

        const getSlider = await Slider.findByPk(id);

        if (!getSlider)
            throw new NotFoundError(`Slider with id: ${id} not found!`);

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved slider data!',
            content: getSlider,
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
        const { judul } = req.body;
        const userUpdate = req.user.username; 
        const role = req.user.role;
        
        if (role !== 'admin') { 
          return response(res, {
            code: 403,
            success: false,
            message: 'Access denied!',
          });
        }

        // Check both uploaded images
        if (!req.files || !req.files.path_web || req.files.path_web.length === 0 || !req.files.path_mobile || req.files.path_mobile.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload both images!',
            });
        }

        if (!judul) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Title must be filled in!',
            });
        }

        if (sanitizeInput(judul)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        const path_web = `${path.relative('../public/slider', req.files.path_web[0].path)}`;
        const path_mobile = `${path.relative('../public/slider', req.files.path_mobile[0].path)}`;
        
        const sanitizedTitle = encode(judul);

        // Validate form
        const newSlider = await Slider.create({
            judul: sanitizedTitle, path_web, path_mobile, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menambahkan slider ${sanitizedTitle}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Slider created successfully!',
            content: newSlider,
        });
    } catch (error) {
        if (req.files && req.files.path_web && req.files.path_web.length > 0) {
            fs.unlinkSync(req.files.path_web[0].path);
        }
        if (req.files && req.files.path_mobile && req.files.path_mobile.length > 0) {
            fs.unlinkSync(req.files.path_mobile[0].path);
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
        const { judul } = req.body;
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

        // Check if the slider with the given ID exists
        const existingSlider = await Slider.findByPk(id);
        if (!existingSlider) {
            throw new NotFoundError(`Slider not found!`);
        }

        // Check both uploaded images
        if (!req.files || !req.files.path_web || req.files.path_web.length === 0 || !req.files.path_mobile || req.files.path_mobile.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload both images!',
            });
        }

        if (!judul) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Title must be filled in!',
            });
        }

        if (sanitizeInput(judul)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        // Delete old files before updating
        if (existingSlider.path_web) {
            fs.unlinkSync(path.join('../public/slider', existingSlider.path_web));
        }
        if (existingSlider.path_mobile) {
            fs.unlinkSync(path.join('../public/slider', existingSlider.path_mobile));
        }

        const path_web = `${path.relative('../public/slider', req.files.path_web[0].path)}`;
        const path_mobile = `${path.relative('../public/slider', req.files.path_mobile[0].path)}`;
        
        const sanitizedTitle = encode(judul);

        // Update slider data
        const updatedSlider = await existingSlider.update({
            judul: sanitizedTitle, path_web, path_mobile, status: false, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} memperbarui slider dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully updated slider!',
            content: updatedSlider,
        });
    } catch (error) {
        if (req.files && req.files.path_web && req.files.path_web.length > 0) {
            fs.unlinkSync(req.files.path_web[0].path);
        }
        if (req.files && req.files.path_mobile && req.files.path_mobile.length > 0) {
            fs.unlinkSync(req.files.path_mobile[0].path);
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

        // Check the slider to be deleted
        const sliderToDelete = await Slider.findByPk(id);
        if (!sliderToDelete) {
            throw new NotFoundError(`Slider not found!`);
        }

        // Delete files from the directory
        if (sliderToDelete.path_web) {
            fs.unlinkSync(path.join('../public/slider', sliderToDelete.path_web));
        }
        if (sliderToDelete.path_mobile) {
            fs.unlinkSync(path.join('../public/slider', sliderToDelete.path_mobile));
        }

        await sliderToDelete.destroy();

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menghapus slider dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully deleted slider!'
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

        // Check if the slider with the given ID exists
        const existingSlider = await Slider.findByPk(id);
        if (!existingSlider) {
            throw new NotFoundError(`Slider not found!`);
        }

        // Update data Slider
        const updatedSlider = await existingSlider.update({
            status: true, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menyetujui pembuatan slider dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Slider updated successfully!',
            content: updatedSlider,
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