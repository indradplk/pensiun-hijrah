const Report = require('../models/Report');
const { User, Admin } = require('../models');
const ActivityAdmin = require('../models/ActivityAdmin');
const { NotFoundError } = require('../errors');
const { sanitizeInput } = require('../helpers/sanitizeInput');
const { response, isEmpty } = require('../helpers/bcrypt');
const path = require('path');
const fs = require('fs');
const { encode } = require('html-entities');

exports.getAll = async (req, res) => {
    try {
        const statusFilter = req.query.status;
        const kategoriFilter = req.query.kategori;
        const whereClause = {};

        // filter by status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        // filter by categories
        if (kategoriFilter) {
            whereClause.kategori = kategoriFilter;
        }

        const getAllReport = await Report.findAll({
            where: whereClause,
        })

        if (isEmpty(getAllReport)) {
            throw new NotFoundError('Reports Not Found!');
        }

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved reports data!',
            content: getAllReport,
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

        const getReport = await Report.findByPk(id);

        if (!getReport)
            throw new NotFoundError(`Report with id: ${id} not found!`);

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved report data!',
            content: getReport,
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
        const { title, kategori } = req.body;
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

        // Check uploaded document
        if (!req.files || !req.files.path_report || !req.files.path_report.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload the document!',
            });
        }

        if (!title || !kategori) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Title and category must be filled in!',
            });
        }

        const validCategory = ['investasi', 'keuangan', 'pengawas'];
        if (!validCategory.includes(kategori)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Invalid category!',
            });
        }

        if (sanitizeInput(title)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }
        
        const path_report = `${path.relative('../public/report', req.files.path_report[0].path)}`;
        
        const sanitizedTitle = encode(title);

        // Validasi form
        const newReport = await Report.create({
            title: sanitizedTitle, kategori, path_report, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menambahkan report ${sanitizedTitle}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Report created successfully!',
            content: newReport,
        });
    } catch (error) {
        if (req.files && req.files.path_report && req.files.path_report.length > 0) {
            fs.unlinkSync(req.files.path_report[0].path);
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
        const { title, kategori } = req.body;
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

        // Check if the report with the given ID exists
        const existingReport = await Report.findByPk(id);
        if (!existingReport) {
            throw new NotFoundError(`Report not found!`);
        }

        // Check uploaded document
        if (!req.files || !req.files.path_report || !req.files.path_report.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload the document!',
            });
        }

        if (!title || !kategori) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Title and category must be filled in!',
            });
        }

        const validCategory = ['investasi', 'keuangan', 'pengawas'];
        if (!validCategory.includes(kategori)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Invalid category!',
            });
        }

        if (sanitizeInput(title)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Input contains invalid characters!',
            });
        }

        // Delete old files before updating
        if (existingReport.path_report) {
            fs.unlinkSync(path.join('../public/report', existingReport.path_report));
        }
        
        const path_report = `${path.relative('../public/report', req.files.path_report[0].path)}`;
        
        const sanitizedTitle = encode(title);

        // Update report data
        const updatedReport = await existingReport.update({
            title: sanitizedTitle, kategori, path_report, status: false, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} memperbarui report dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully updated report!',
            content: updatedReport,
        });
    } catch (error) {
        if (req.files && req.files.path_report && req.files.path_report.length > 0) {
            fs.unlinkSync(req.files.path_report[0].path);
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

        // Check the report to be deleted
        const ReportToDelete = await Report.findByPk(id);
        if (!ReportToDelete) {
            throw new NotFoundError(`Report not found!`);
        }

        // Delete files from the directory
        if (ReportToDelete.path_report) {
            fs.unlinkSync(path.join('../public/report', ReportToDelete.path_report));
        }

        await ReportToDelete.destroy();

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menghapus report dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully deleted report!'
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

        // Check if the document with the given ID exists
        const existingReport = await Report.findByPk(id);
        if (!existingReport) {
            throw new NotFoundError(`Document not found!`);
        }

        // Update data Document
        const updatedReport = await existingReport.update({
            status: true, userUpdate
        });

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${userUpdate} menyetujui pembuatan report dengan id: ${id}`
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Report updated successfully!',
            content: updatedReport,
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