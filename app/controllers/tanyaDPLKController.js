const TanyaDPLK = require('../models/TanyaDPLK');
const ActivityAdmin = require('../models/ActivityAdmin');
const { NotFoundError } = require('../errors');
const { response, isEmpty } = require('../helpers/bcrypt');

exports.getAll = async (req, res) => {
    try {
        const statusFilter = req.query.status;
        const whereClause = {};
        const role = req.user.role;
        
        if (role !== 'admin') { 
          return response(res, {
            code: 403,
            success: false,
            message: 'Access denied!',
          });
        }

        // Jika filter tersedia dan valid, tambahkan filter berdasarkan status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        const getAllMail = await TanyaDPLK.findAll({
            where: whereClause,
        });

        if (isEmpty(getAllMail)) {
            throw new NotFoundError('Mail Not Found!');
        }
        
        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved tanya DPLK data!',
            content: getAllMail,
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
        const role = req.user.role;
        
        if (role !== 'admin') { 
          return response(res, {
            code: 403,
            success: false,
            message: 'Access denied!',
          });
        }

        const getMail = await TanyaDPLK.findOne({
            where: { id: id }
        });

        if (!getMail)
            throw new NotFoundError(`Mail with id: ${id} not found!`);

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved Tanya DPLK data!',
            content: getMail,
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

exports.update = async (req, res) => {
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

        // Check if the mail with the given ID exists
        const existingMail = await TanyaDPLK.findByPk(id);
        if (!existingMail) {
            throw new NotFoundError(`Email not found!`);
        }

        // Update status to true
        const editMail = await existingMail.update({
            userUpdate, status: true
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} telah merespon email Tanya DPLK dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully updated Tanya DPLK!',
            content: editMail,
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