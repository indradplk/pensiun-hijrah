const ActivityAdmin = require('../models/ActivityAdmin');
const User = require('../models/User');
const Admin = require('../models/Admin');
const { NotFoundError } = require('../errors');
const { response, isEmpty } = require('../helpers/bcrypt');

exports.getAll = async (req, res) => {
    try {
        const statusFilter = req.query.status;
        const whereClause = {};
        const userUpdate = req.user.username;
        const role = req.user.role;
    
        // Check if the admin with the role administrator
        const admin = await User.findOne({ where: { username: userUpdate } });
        const userAdmin = await Admin.findOne({ where: { id: admin.adminId } });
        
        // Only allow administrator to see log activity
        if (role === 'admin') {
            if (userAdmin.role !== 'administrator') { 
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