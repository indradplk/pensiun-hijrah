const Parameter = require('../models/Parameter');
const ActivityAdmin = require('../models/ActivityAdmin');
const { User } = require('../models');
const { Admin } = require('../models');
const { NotFoundError } = require('../errors');
const { sanitizeInput } = require('../helpers/sanitizeInput');
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

        const getAllParameter = await Parameter.findAll({
            where: whereClause,
        });

        if (isEmpty(getAllParameter)) {
            throw new NotFoundError('Parameter Not Found!');
        }

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved parameter data!',
            content: getAllParameter,
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
        const { KEY_PARAMETER } = req.params;

        const getParameter = await Parameter.findOne({
            where: { KEY_PARAMETER },
        });

        if (!getParameter)
            throw new NotFoundError(`Parameter ${KEY_PARAMETER} not found!`);

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved parameter data!',
            content: getParameter,
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
        const { NUMERIC_VALUE } = req.body;
        const { id } = req.params;
        const userUpdate = req.user.username;   
        const role = req.user.role; 

        // Check if the admin with the role administrator
        const admin = await User.findOne({ where: { username: userUpdate } });
        const userAdmin = await Admin.findOne({ where: { id: admin.adminId } });
    
        // Only allow administrator to unblock account
        if (role === 'admin') { 
          if (userAdmin.role !== 'administrator' && userAdmin.role !== 'supervisor') { 
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

        // Check if the Parameter with the given ID exists
        const existingParameter = await Parameter.findByPk(id);
        if (!existingParameter) {
            throw new NotFoundError(`Parameter not found!`);
        }

        if (!NUMERIC_VALUE) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Numeric Value must be filled in!',
            });
        }

        if (sanitizeInput(NUMERIC_VALUE)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }
        const sanitizedNumericValue = encode(NUMERIC_VALUE);

        // Update Parameter data
        const updatedParameter = await existingParameter.update({
            NUMERIC_VALUE: sanitizedNumericValue,
            userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} memperbarui parameter dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully updated Parameter!',
            content: updatedParameter,
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