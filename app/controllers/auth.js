require('dotenv').config();
const User = require('../models/User');
const { response, comparePassword } = require('../helpers/bcrypt');
const { WrongPasswordError, NotFoundError } = require('../errors');
const jwt = require('jsonwebtoken');

exports.login = async (req, res) => {
  const { username, password, role } = req.body;

  try {
    if (!username || !password || !role) {
      return response(res, {
        code: 400,
        success: false,
        message: 'All fields are required!',
      });
    }

    const user = await User.findOne({ where: { username, role } });
    if (!user) {
      throw new NotFoundError(
          "User not found!"
      );
    }

    if (!user.status) {
      return response(res, {
        code: 403,
        success: false,
        message: 'Your account is blocked and inactive. Please contact administrator.',
      });
    }

    // compare user-inputed password with database password
    const checkPassword = await comparePassword(password, user.password);
    if (!checkPassword) {
      user.block_count += 1;

      if (user.block_count >= 3) {
        user.status = false;
        await user.save();
        return response(res, {
          code: 403,
          success: false,
          message: 'Your account has been blocked after 3 failed login attempts.',
        });
      }

      await user.save();

      throw new WrongPasswordError(
        "Your username or password is incorrect!"
      );
    }

    user.block_count = 0;
    await user.save();

    // create new jwt token
    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.ACCESS_JWT_SECRET,
      { expiresIn: '1h' }
    );

    // store the token in user browser cookie
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'None' : 'Lax',
      path: '/' 
    });
    
    switch (user.role) {
      case 'admin':
        return response(res, {
          code: 200,
          success: true,
          message: 'Login successfully!',
          content: {
            token,
            id: user.adminId,
            role: user.role,
            username: user.username,
          },
        });
      case 'peserta':
        return response(res, {
          code: 200,
          success: true,
          message: 'Login successfully!',
          content: {
            token,
            role: user.role,
            username: user.username,
            email: user.pesertaEmail,
          },
        });
      case 'perusahaan':
        return response(res, {
          code: 200,
          success: true,
          message: 'Login successfully!',
          content: {
            token,
            role: user.role,
            username: user.username,
            email: user.perusahaanEmail,
          },
        });
      default:
        return response(res, {
          code: 400,
          success: false,
          message: 'Invalid role!',
        });
    }
  } catch (error) {
    if (
      error.name === 'NotFoundError' ||
      error.name === 'WrongPasswordError'
    ) {
      return response(res, {
        code: 400,
        success: false,
        message: error.message,
      });
    }

    return response(res, {
      code: 500,
      success: false,
      message: error.message || 'Something went wrong.',
      content: error,
    });
  }
}

exports.logout = async (req, res) => {
  try {
    res.clearCookie('token', { httpOnly: true, secure: true });

    return response(res, {
      code: 200,
      success: true,
      message: 'Logged out successfully!',
    });
  } catch (error) {
    return response(res, {
      code: 500,
      success: false,
      message: error.message || 'Something went wrong.',
    });
  }
}