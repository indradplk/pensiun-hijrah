const ActivityAdmin = require('../models/ActivityAdmin');
const { User, Admin } = require('../models');
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

        // filter by status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        const getAllAdmin = await ActivityAdmin.findAll({
            attributes: ['id', 'nik', 'log', 'createdAt', 'updatedAt'],
            where: whereClause,
        });

        if (isEmpty(getAllAdmin)) {
            throw new NotFoundError('Log Not Found!');
        }

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved log data!',
            content: getAllAdmin,
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