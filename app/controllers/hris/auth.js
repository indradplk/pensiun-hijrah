require('dotenv').config();
const { connectToDatabaseHRIS } = require('../../config/db_hris');
const { response } = require('../../helpers/bcrypt');
const { NotFoundError } = require('../../errors');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

exports.login = async (req, res) => {
  
  let { username, password } = req.body;

  if (!username || !password) {
    return response(res, {
      code: 400,
      success: false,
      message: 'All fields are required!',
    });
  }

  const pengacak = "AJWKXLAJSCLWLW";
  const hashPassword = crypto.createHash('md5').update(pengacak + crypto.createHash('md5').update(password).digest('hex') + pengacak).digest('hex');

  const loginSql = `
    SELECT ul.userid, ul.nm_user, ul.level, ul.lokasi
    FROM user_login ul
    WHERE ul.userid = ? AND ul.password = ?
  `;

  try {
    const pool = await connectToDatabaseHRIS();
    const [loginQry] = await pool.execute(loginSql, [username, hashPassword]);

    if (loginQry.length === 0) {
      throw new NotFoundError("Username or Password is incorrect!");
    }

    const loginData = loginQry[0];

    // create new jwt token
    const token = jwt.sign(
      {
        username: loginData.userid,
        nama: loginData.nm_user,
        role: loginData.level,
        lokasi: loginData.lokasi
      },
      process.env.ACCESS_JWT_SECRET,
      { expiresIn: '1h' }
    );

    // store the token in user browser cookie
    res.cookie('token', token, { httpOnly: false, secure: true });
    
    return response(res, {
      code: 200,
      success: true,
      message: 'Login successful!',
      content: {
        token,
        username: loginData.userid,
        role: loginData.level,
        nama: loginData.nm_user,
        lokasi: loginData.lokasi,
      },
    });
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
    res.clearCookie('token', { httpOnly: false, secure: true });

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