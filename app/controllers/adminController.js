const { User, Admin } = require('../models');
const ActivityAdmin = require('../models/ActivityAdmin');
const { response, hashPassword, comparePassword } = require('../helpers/bcrypt');
const { DuplicatedDataError, NotFoundError } = require('../errors');
const sanitizeInput = require('../helpers/sanitizeInput');
const { encode } = require('html-entities');

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

exports.getOne = async (req, res) => {
  try {
    const id = req.params.id;
    const role = req.user.role;

    // Only allow admin to see another admin
    if (role !== 'admin') { 
      return response(res, {
        code: 403,
        success: false,
        message: 'Access denied!',
      });
    }

    const user = await Admin.findByPk(id);

    if (!user)
      throw new NotFoundError(`Admin with id: ${id} not found!`);

    return response(res, {
      code: 200,
      success: true,
      message: `Successfully retrieved Admin data!`,
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
    });
  }
};

exports.addAdmin = async (req, res) => {
  try {
    const { nama, username, email, role } = req.body;
    const userUpdate = req.user.username; 
    const roles = req.user.role;

    // Only allow admin to see another admin
    if (roles !== 'admin') { 
      return response(res, {
        code: 403,
        success: false,
        message: 'Access denied!',
      });
    }

    // Check if the admin with the role administrator
    const user = await User.findOne({ where: { username: userUpdate } });
    if (!user) {
      return response(res, {
        code: 404,
        success: false,
        message: 'You are not authorized to add another admin!',
      });
    }

    const userAdmin = await Admin.findOne({ where: { id: user.adminId } });
    if (!userAdmin) {
      return response(res, {
        code: 404,
        success: false,
        message: 'You are not authorized to add another admin!',
      });
    }

    if (userAdmin.role !== 'administrator') {
      return response(res, {
        code: 403,
        success: false,
        message: 'You are not authorized to add another admin!',
      });
    }
  
    if (!nama || !username || !email || !role) {
      return response(res, {
        code: 400,
        success: false,
        message: 'All fields are required!',
      });
    }

    const validRoles = ['administrator', 'supervisor', 'operator'];
    if (!validRoles.includes(role)) {
      return response(res, {
        code: 400,
        success: false,
        message: 'Invalid role!',
      });
    }

    if (email && !isValidEmail(email)) {
      return response(res, {
        code: 400,
        success: false,
        message: 'Please enter a valid email address!',
      });
    }

    if (sanitizeInput(nama) || sanitizeInput(username)) {
      return response(res, {
          code: 400,
          success: false,
          message: 'Input contains invalid characters!',
      });
    }

    const [userExists, emailExists] = await Promise.all([
      User.findOne({ where: { username } }),
      Admin.findOne({ where: { email } })
    ]);

    if (userExists || emailExists) {
      throw new DuplicatedDataError('Username or email already exists!');
    }

    const sanitizedNama = encode(nama);
    const sanitizedUsername = encode(username);

    const hashedPassword = await hashPassword(username);

    const createdAdmin = await Admin.create({
      name: sanitizedNama, email, role, userUpdate
    });

    let createdUser = await User.create({
      username: sanitizedUsername,
      password: hashedPassword,
      role: 'admin',
      adminId: createdAdmin.id,
      userUpdate
    }); 

    await ActivityAdmin.create({
      nik: userUpdate,
      log: `${userUpdate} menambahkan user admin ${sanitizedUsername}`
    });

    // create reference between Admin and User models
    createdUser.admin = createdAdmin._id;
    await createdUser.save();

    // prevent password to be showed in response
    createdUser.password = undefined;
    createdUser = JSON.parse(JSON.stringify(createdUser));

    return response(res, {
      code: 201,
      success: true,
      message: 'Successfully registered!',
      content: {
        user: { createdUser, createdAdmin },
      },
    });
  } catch (error) {
    if (error.name === 'DuplicatedDataError') {
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
};

exports.editAdmin = async (req, res) => {
  try {
    const { name, email, currentPassword, newPassword } = req.body;
    const { username } = req.params;
    const userUpdate = req.user.username;
    const role = req.user.role;

    // Only allow admin to see another admin
    if (role !== 'admin') { 
      return response(res, {
        code: 403,
        success: false,
        message: 'Access denied!',
      });
    }

    // Only allow admins to edit themselves
    if (username !== userUpdate) {
      return response(res, {
        code: 403,
        success: false,
        message: 'You are not authorized to edit another admin!',
      });
    }

    // Check if the admin with the given ID exists
    const userExists = await User.findOne({ where: { username } });
    if (!userExists) {
      throw new NotFoundError(`User not found!`);
    }

    if (!name || !email || !currentPassword || !newPassword) {
      return response(res, {
        code: 400,
        success: false,
        message: 'All fields are required!',
      });
    }

    if (email && !isValidEmail(email)) {
      return response(res, {
        code: 400,
        success: false,
        message: 'Please enter a valid email address!',
      });
    }

    // Validate new password length
    if (newPassword.length < 8) {
      return response(res, {
        code: 400,
        success: false,
        message: 'New password must be at least 8 characters long!',
      });
    }

    // Verify current password
    const passwordMatch = await comparePassword(currentPassword, userExists.password);
    if (!passwordMatch) {
      return response(res, {
        code: 400,
        success: false,
        message: 'Current password is incorrect!',
      });
    }

    const hashedPassword = await hashPassword(newPassword);

    const updateAdmin = await Admin.update(
      { name, email, userUpdate },
      { where: { id: userExists.adminId } }
    );
  
    let updateUser = await User.update(
      { password: hashedPassword, userUpdate },
      { where: { username } }
    );
  
    // prevent password to be showed in response
    updateUser.password = undefined;
    updateUser = JSON.parse(JSON.stringify(updateUser));
  
    return response(res, {
      code: 201,
      success: true,
      message: 'Successfully updated!',
      content: {
        user: { updateUser, updateAdmin },
      },
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
};

exports.unblockAccount = async (req, res) => {
  try {
    const { username } = req.params;
    const userUpdate = req.user.username;
    const role = req.user.role;

    // Only allow admin to see another admin
    if (role !== 'admin') { 
      return response(res, {
        code: 403,
        success: false,
        message: 'Access denied!',
      });
    }

    // Check if the user with the given ID exists
    const userExists = await User.findOne({ where: { username } });
    if (!userExists) {
      throw new NotFoundError(`User not found!`);
    }

    // Reset password to default 'dplk'
    const newPassword = "dplk";
    const hashedPassword = await hashPassword(newPassword);

    await User.update(
      { 
        status: true, block_count: 0, userUpdate, password: hashedPassword
      },
      { where: { username } }
    );

    await ActivityAdmin.create({
      nik: userUpdate,
      log: `${userUpdate} mereset ulang akun admin ${username}`
    });
  
    return response(res, {
      code: 200,
      success: true,
      message: 'Akun berhasil diaktifkan kembali!',
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
};