const Office = require('../models/Office');
const { User, Admin } = require('../models');
const ActivityAdmin = require('../models/ActivityAdmin');
const { NotFoundError } = require('../errors');
const { sanitizeInput, containsEventAttributes, containsScriptTag } = require('../helpers/sanitizeInput');
const { response, isEmpty } = require('../helpers/bcrypt');

exports.getAll = async (req, res) => {
    try {
        const statusFilter = req.query.status;
        const whereClause = {};
        
        const page = parseInt(req.query.page) || 1;
        const limit = 15;

        // filter by status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        let getAllOffice;
        if (req.query.page) {
            const offset = (page - 1) * limit;
            getAllOffice = await Office.findAll({
                attributes: ['id', 'kode_cabang', 'nama', 'cabang', 'area', 'alamat', 'telepon'],
                where: whereClause,
                limit: limit,
                offset: (page - 1) * limit
            });
        } else {
            getAllOffice = await Office.findAll({
                attributes: ['id', 'kode_cabang', 'nama', 'cabang', 'area', 'alamat', 'telepon'],
                where: whereClause
            });
        }

        if (isEmpty(getAllOffice)) {
            throw new NotFoundError('Office Not Found!');
        }

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved Office data!',
            content: getAllOffice,
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
        const id = req.params.id;

        const getOffice = await Office.findOne({
            where: { id: id }
        });
        
        if (!getOffice)
            throw new NotFoundError(`Office with id: ${id} not found!`);

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved Office data!',
            content: getOffice,
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
        const { kode_cabang, nama, cabang, area, alamat, telepon } = req.body;
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

        // Validasi form
        if (!kode_cabang || !nama || !cabang || !area || !alamat || !telepon) {
            return response(res, {
                code: 400,
                success: false,
                message: 'All fields must be filled in!',
            });
        }

        // Create Office
        const newOffice = await Office.create({
            kode_cabang, nama, cabang, area, alamat, telepon, userUpdate
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Office created successfully!',
            content: newOffice,
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
        const { kode_cabang, nama, cabang, area, alamat, telepon } = req.body;
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

        // Check if the Office with the given ID exists
        const existingOffice = await Office.findByPk(id);
        if (!existingOffice) {
            throw new NotFoundError(`Office not found!`);
        }

        // Validasi form
        if (!kode_cabang || !nama || !cabang || !area || !alamat || !telepon) {
            return response(res, {
                code: 400,
                success: false,
                message: 'All fields must be filled in!',
            });
        }

        // Update Office
        const editOffice = await existingOffice.update({
            kode_cabang, nama, cabang, area, alamat, telepon, status: false, userUpdate
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully updated Office!',
            content: editOffice,
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
        const id = req.params.id;
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

        // Check the Office to be deleted
        const OfficeToDelete = await Office.findByPk(id);
        if (!OfficeToDelete) {
            throw new NotFoundError(`Office not found!`);
        }

        await OfficeToDelete.destroy();

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully deleted Office!'
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

        // Check if the Office with the given ID exists
        const existingOffice = await Office.findByPk(id);
        if (!existingOffice) {
            throw new NotFoundError(`Office not found!`);
        }

        // Update data Office
        const updatedOffice = await existingOffice.update({
            status: true, userUpdate
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Office updated successfully!',
            content: updatedOffice,
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