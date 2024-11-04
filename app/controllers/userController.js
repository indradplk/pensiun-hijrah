const { response, isEmpty } = require('../helpers/bcrypt');
const { NotFoundError } = require('../errors');
const User = require('../models/User');
const Admin = require('../models/Admin');
const { Op } = require('sequelize');

exports.getAll = async (req, res) => {
  try {
    const roleFilter = req.query.role;
    const whereClause = {};
    const role = req.user.role;

    // Check if the admin with the role administrator
    const admin = await User.findOne({ where: { username: userUpdate } });
    const userAdmin = await Admin.findOne({ where: { id: admin.adminId } });

    // Only allow administrator to see user
    if (role !== 'admin') {
      if (userAdmin.role !== 'administrator') { 
        return response(res, {
          code: 403,
          success: false,
          message: 'Access denied!',
        });
      }
    }

    // filter by role
    if (roleFilter) {
      whereClause.role = roleFilter;
    }

    let users = await User.findAll({
      where: whereClause
    });

    if (isEmpty(users)) {
      throw new NotFoundError('Users Not Found!');
    }
      
    // prevent password to be shown in response
    users = users.map(user => {
      user.password = undefined;
      return JSON.parse(JSON.stringify(user));
    });

    return response(res, {
      code: 200,
      success: true,
      message: 'Successfully retrieved users data!',
      content: users,
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
  const { username } = req.params;
  const userUpdate = req.user.username;
  const role = req.user.role;

  try {
    // Check if the admin with the role administrator
    const admin = await User.findOne({ where: { username: userUpdate } });
    const userAdmin = await Admin.findOne({ where: { id: admin.adminId } });

    // Only allow themself and administrator to see user
    if (role !== 'admin') {
      if (username !== userUpdate) {
        return response(res, {
          code: 403,
          success: false,
          message: 'Access denied!',
        });
      }
    }

    let user;
    if (userAdmin.role !== 'administrator') {
      user = await User.findOne({
          where: {
            username,
            [Op.or]: [
              { role: { [Op.or]: ['peserta', 'perusahaan'] } },
              { username: userUpdate }
            ]
          }
      });

      if (!user)
        throw new NotFoundError(`Access denied!`);
    } else {
        user = await User.findOne({ where: { username } });

        if (!user)
          throw new NotFoundError(`User with username ${username} not found!`);
    }
      
    // prevent password to be shown in response
    user.password = undefined;
    user = JSON.parse(JSON.stringify(user));

    return response(res, {
      code: 200,
      success: true,
      message: `Successfully retrieved ${username} data!`,
      content: user,
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
    const role = req.user.role;

    // Check if the admin with the role administrator
    const admin = await User.findOne({ where: { username: userUpdate } });
    const userAdmin = await Admin.findOne({ where: { id: admin.adminId } });

    // Only allow administrator to delete user
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

    const user = await User.findByPk(id);

    if (!user) throw new NotFoundError('User not found!');

    const adminId = user.adminId;
      
    await User.destroy({ where: { id } });

    if (user.role === 'admin') await Admin.destroy({ where: { id: adminId } });

    return response(res, {
      code: 200,
      success: true,
      message: 'Successfully deleted user!',
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
