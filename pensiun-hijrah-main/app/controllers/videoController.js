const Video = require('../models/Video');
const ActivityAdmin = require('../models/ActivityAdmin');
const { NotFoundError } = require('../errors');
const sanitizeInput = require('../helpers/sanitizeInput');
const { response, isEmpty } = require('../helpers/bcrypt');
const { encode } = require('html-entities');

exports.getAll = async (req, res) => {
    try {
        const statusFilter = req.query.status;
        const whereClause = {};

        // filter by status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        const getAllVideo = await Video.findAll({
            where: whereClause,
        });

        if (isEmpty(getAllVideo)) {
            throw new NotFoundError('Videos Not Found!');
        }

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved videos data!',
            content: getAllVideo,
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

        const getVideo = await Video.findByPk(id);
        if (!getVideo)
            throw new NotFoundError(`Video with id: ${id} not found!`);

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved video data!',
            content: getVideo,
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
        const { title, link } = req.body;
        const userUpdate = req.user.username; 

        // Validate form
        if (!title || !link) {
            return response(res, {
              code: 404,
              success: false,
              message: "Title and link must be filled in!",
            });
        }

        if (sanitizeInput(title)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }
        
        const sanitizedTitle = encode(title);

        // Create Video
        const newVideo = await Video.create({
            title: sanitizedTitle, link, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menambahkan video ${sanitizedTitle}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Video created successfully!',
            content: newVideo,
        });
    } catch (error) {
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
        const { title, link } = req.body;
        const { id } = req.params;
        const userUpdate = req.user.username; 

        // Check if the Video with the given ID exists
        const existingVideo = await Video.findByPk(id);
        if (!existingVideo) {
            throw new NotFoundError(`Video not found!`);
        }

        // Validate form
        if (!title || !link) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Title and link must be filled in!',
            });
        }

        if (sanitizeInput(title)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }
        
        const sanitizedTitle = encode(title);

        // Update Video
        const editVideo = await existingVideo.update({
            title: sanitizedTitle, link, status: false, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} memperbarui video dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully updated Video!',
            content: editVideo,
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

exports.delete = async (req, res) => {
    try {
        const { id } = req.params;
        const userUpdate = req.user.username; 

        // Check the Video to be deleted
        const VideoToDelete = await Video.findByPk(id);
        if (!VideoToDelete) {
            throw new NotFoundError(`Video not found!`);
        }

        await VideoToDelete.destroy();

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menghapus video dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully deleted Video!'
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

        // Check if the Video with the given ID exists
        const existingVideo = await Video.findByPk(id);
        if (!existingVideo) {
            throw new NotFoundError(`News not found!`);
        }

        // Update data Video
        const updatedVideo = await existingVideo.update({
            status: true, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menyetujui pembuatan video dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Video updated successfully!',
            content: updatedVideo,
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