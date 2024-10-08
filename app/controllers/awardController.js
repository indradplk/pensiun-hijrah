const Award = require('../models/Award');
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

        const getAllAward = await Award.findAll({
            where: whereClause,
        });

        if (isEmpty(getAllAward)) {
            throw new NotFoundError('Awards Not Found!');
        }

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved Awards data!',
            content: getAllAward,
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
        const id = req.params;

        const getAward = await Award.findOne({
            where: { id: id, status: true },
        });

        if (!getAward)
            throw new NotFoundError(`Award with id: ${id} not found!`);
        
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved Award data!',
            content: getAward,
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
        const { description } = req.body;
        const userUpdate = req.user.username; 

        // Check uploaded image
        if (!req.files || !req.files.path_award || req.files.path_award.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload the image!',
            });
        }

        if (!description) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Description must be filled in!',
            });
        }

        if (sanitizeInput(description)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        const path_award = `${path.relative('../public/penghargaan', req.files.path_award[0].path)}`;

        const sanitizedDescription = encode(description);

        // Validasi form
        const newAward = await Award.create({
            path_award, description: sanitizedDescription, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menambahkan award ${sanitizedDescription}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Award created successfully!',
            content: newAward,
        });
    } catch (error) {
        if (req.files && req.files.path_award && req.files.path_award.length > 0) {
            fs.unlinkSync(req.files.path_award[0].path);
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
        const { description } = req.body;
        const { id } = req.params;
        const userUpdate = req.user.username; 

        // Check if the Award with the given ID exists
        const existingAward = await Award.findByPk(id);
        if (!existingAward) {
            throw new NotFoundError(`Award not found!`);
        }

        // Check uploaded image
        if (!req.files || !req.files.path_award || req.files.path_award.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload the image!',
            });
        }

        if (!description) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Description must be filled in!',
            });
        }

        if (sanitizeInput(description)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        // Delete old files before updating
        if (existingAward.path_award) {
            fs.unlinkSync(path.join('../public/penghargaan', existingAward.path_award));
        }

        const path_award = `${path.relative('../public/penghargaan', req.files.path_award[0].path)}`;

        const sanitizedDescription = encode(description);

        // Update data Award
        const updatedAward = await existingAward.update({
            path_award, description: sanitizedDescription, status: false, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} memperbarui award ${sanitizedDescription}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully updated Award!',
            content: updatedAward,
        });
    } catch (error) {
        if (req.files && req.files.path_award && req.files.path_award.length > 0) {
            fs.unlinkSync(req.files.path_award[0].path);
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

       // Check the Award to be deleted
        const awardToDelete = await Award.findByPk(id);

        if (!awardToDelete) {
            throw new NotFoundError(`Award not found!`);
        }

        // Delete files from the directory
        if (awardToDelete.path_award) {
            fs.unlinkSync(path.join('../public/penghargaan', awardToDelete.path_award));
        }

        await awardToDelete.destroy();

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menghapus award dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully deleted Award!'
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

        // Check if the Award with the given ID exists
        const existingAward = await Award.findByPk(id);

        if (!existingAward) {
            throw new NotFoundError(`Award not found!`);
        }

        // Update data Award
        const updatedAward = await existingAward.update({
            status: true, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menyetujui pembuatan award dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Award updated successfully!',
            content: updatedAward,
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