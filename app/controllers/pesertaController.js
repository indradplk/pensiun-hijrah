const { User } = require('../models');
const ActivityAdmin = require('../models/ActivityAdmin');
const { connectToDatabasePPIP } = require('../config/db_ppip_test');
const { response, hashPassword, comparePassword } = require('../helpers/bcrypt');
const { NotFoundError } = require('../errors');

// Function to validate email format
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

async function checkIfExists(no_peserta) {
  try {
    const query = `
      SELECT * 
      FROM NASABAHDPLK 
      WHERE no_peserta = '${no_peserta}'
    `;

    const pool = await connectToDatabasePPIP();
    const result = await pool.request().query(query);

    return result.recordset.length > 0;
  } catch (error) {
    return response(res, {
      code: 500,
      success: false,
      message: error.message || 'Something went wrong!',
    });
  }
}

exports.editPeserta = async (req, res) => {
  try {
    const { email, currentPassword, newPassword } = req.body;
    const { username } = req.params;
    const userUpdate = req.user.username;

    // Only allow users to edit themselves
    if (username !== userUpdate) {
      return response(res, {
        code: 403,
        success: false,
        message: 'You are not authorized to edit another user!',
      });
    }

    // Check if the user with the given ID exists
    const userExists = await User.findOne({ where: { username } });
    if (!userExists) {
      throw new NotFoundError(`User not found!`);
    }

    if (!email || !currentPassword || !newPassword) {
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
  
    let updateUser = await User.update(
      { password: hashedPassword, pesertaEmail: email, userUpdate },
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
        updateUser
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

exports.registrasiPeserta = async (req, res) => {
  try {
    const { no_peserta, email, password } = req.body;

    // Check if the user with the given ID exists
    const isRegistered = await checkIfExists(no_peserta);
    if (!isRegistered) {
      return response(res, {
        code: 400,
        success: false,
        message: 'Anda tidak terdaftar sebagai peserta DPLK Syariah Muamalat!',
      });
    }

    const userExists = await User.findOne({ where: { username: no_peserta } });
    if (userExists) {
      throw new NotFoundError(`Akun sudah terdaftar!`);
    }

    if (!email || !password) {
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
    if (password.length < 8) {
      return response(res, {
        code: 400,
        success: false,
        message: 'Password must be at least 8 characters long!',
      });
    }

    const hashedPassword = await hashPassword(password);

    let newPeserta = await User.create({ 
      username: no_peserta, 
      pesertaEmail: email, 
      password: hashedPassword, 
      role: 'peserta', 
      userUpdate: no_peserta 
    });
  
    // prevent password to be showed in response
    newPeserta.password = undefined;
    newPeserta = JSON.parse(JSON.stringify(newPeserta));
  
    return response(res, {
      code: 201,
      success: true,
      message: 'Successfully created!',
      content: {
        newPeserta
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
    const { no_peserta } = req.params;
    const userUpdate = req.user.username;

    // Check if the user with the given ID exists
    const userExists = await User.findOne({ where: { username: no_peserta } });
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
      { where: { username: no_peserta } }
    );

    await ActivityAdmin.create({
      nik: userUpdate,
      log: `${userUpdate} mereset ulang akun peserta ${no_peserta}`
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