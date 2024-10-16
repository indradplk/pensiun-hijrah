const RegistrasiPerusahaan = require('../models/RegistrasiPerusahaan');
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

        const getAllRegistrasi = await RegistrasiPerusahaan.findAll({
            where: whereClause,
        })

        if (isEmpty(getAllRegistrasi)) {
            throw new NotFoundError('Registration Data Not Found!');
        }

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved registration data!',
            content: getAllRegistrasi,
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
        const role = req.user.role;
        
        if (role !== 'admin') { 
          return response(res, {
            code: 403,
            success: false,
            message: 'Access denied!',
          });
        }

        const getRegistrasi = await RegistrasiPerusahaan.findByPk(id);

        if (!getRegistrasi)
            throw new NotFoundError(`Registration data with id: ${id} not found!`);

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved registration data!',
            content: getRegistrasi,
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