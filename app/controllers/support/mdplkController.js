const { connectToDatabaseMDPLK } = require('../../config/db_mdplk');
const { response } = require('../../helpers/bcrypt');
const { NotFoundError } = require('../../errors');
const { sanitizeInput } = require('../../helpers/sanitizeInput');
const { encode } = require('html-entities');
const fs = require('fs');

exports.getKlaim = async (req, res) => {
  try {
  const { no_peserta } = req.params;
  const userUpdate = req.user.username;

  // Only allow user to see themselves
  if (no_peserta !== userUpdate) {
    return response(res, {
      code: 403,
      success: false,
      message: 'Access denied!',
    });
  }
  
  const query = `
    SELECT
      id,  
      DATE_FORMAT(tgl_input, '%d/%m/%Y') AS tgl_input,
      DATE_FORMAT(tgl_otorisasi, '%d/%m/%Y') AS tgl_otorisasi,
      keterangan,
      flag,
      CASE
        WHEN pengajuan = 'V' THEN 'Penarikan Sebagian (20%)'
        WHEN pengajuan = 'W' THEN 'Penarikan Akumulasi Iuran (PHK)'
        WHEN pengajuan = 'J' THEN 'Pengambilan Manfaat Iuran (MP)'
      END as pengajuan,
      CASE 
        WHEN flag = 'F' THEN 'Received'
        WHEN flag = 'T' THEN 'In Process'
        WHEN flag = 'C' THEN 'Credited'
        WHEN flag = 'P' THEN 'Incomplete'
        WHEN flag = 'I' THEN 'Confirmation'
        WHEN flag = 'D' THEN 'Cancelled'
      END as status
      FROM temp_pengajuan
      WHERE no_peserta = ?
      ORDER BY id DESC
    `;

    const pool = await connectToDatabaseMDPLK();
    const [result] = await pool.execute(query, [no_peserta]);

    if (result.length > 0) {
        return response(res, {
          code: 200,
          success: true,
          message: `Successfully retrieved claim data!`,
          content: result,
        });
    } else {
        throw new NotFoundError(`Claim with username: ${no_peserta} not found!`);
    }
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

exports.getPengkinianData = async (req, res) => {
  try {
    const { no_peserta } = req.params;
    const { status } = req.query;
    const userUpdate = req.user.username;

    // Only allow user to see themselves
    if (no_peserta !== userUpdate) {
        return response(res, {
        code: 403,
        success: false,
        message: 'Access denied!',
        });
    }
    
    let query = `
        SELECT no_peserta, nama_lengkap FROM test_pengkinian_data
        WHERE no_peserta = ?
    `;

    if (status === 'false') {
      query += `AND flag = 'F'`;
    } else if (status === 'true') {
      query += `AND flag = 'T'`;
    }    

    const pool = await connectToDatabaseMDPLK();
    const [result] = await pool.execute(query, [no_peserta]);

    if (result.length > 0) {
        return response(res, {
          code: 200,
          success: true,
          message: `Successfully retrieved latest data!`,
          content: result,
        });
    } else {
        throw new NotFoundError(`Latest data with username: ${no_peserta} not found!`);
    }
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

exports.getPaketInvestasi = async (req, res) => {
  try {
    const { status } = req.query;
    const role = req.user.role;
    
    if (role !== 'admin') { 
      return response(res, {
        code: 403,
        success: false,
        message: 'Access denied!',
      });
    }
    
    let query = `
        SELECT no_peserta, nama_lengkap, kode_paket_lama, kode_paket_baru, flag, dateadd, dateupd, useradd FROM test_pindah_paket
    `;

    if (status === 'false') {
      query += `AND flag = 'F'`;
    } else if (status === 'true') {
      query += `AND flag = 'T'`;
    }    

    const pool = await connectToDatabaseMDPLK();
    const [result] = await pool.execute(query);

    if (result.length > 0) {
        return response(res, {
          code: 200,
          success: true,
          message: `Successfully retrieved investment package data!`,
          content: result,
        });
    } else {
        throw new NotFoundError(`Investment package data not found!`);
    }
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

exports.getLCF = async (req, res) => {
  try {
    const { no_peserta } = req.params;
    const userUpdate = req.user.username;

    // Only allow user to see themselves
    if (no_peserta !== userUpdate) {
        return response(res, {
        code: 403,
        success: false,
        message: 'Access denied!',
        });
    }
    
    const query = `
        SELECT no_peserta, nama_lengkap FROM test_lcf
        WHERE no_peserta = ?
    `;

    const pool = await connectToDatabaseMDPLK();
    const [result] = await pool.execute(query, [no_peserta]);

    if (result.length > 0) {
        return response(res, {
          code: 200,
          success: true,
          message: `Successfully retrieved life cycle fund data!`,
          content: result,
        });
    } else {
        throw new NotFoundError(`Life cycle fund data with username: ${no_peserta} not found!`);
    }
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

exports.lastPackage = async (req, res) => {
  try {
    const { no_peserta } = req.params;
    const userUpdate = req.user.username;

    // Only allow user to see themselves
    if (no_peserta !== userUpdate) {
        return response(res, {
        code: 403,
        success: false,
        message: 'Access denied!',
        });
    }
    
    const query = `
      SELECT
        no_peserta, nama_lengkap, kode_paket_lama, kode_paket_baru
      FROM test_pindah_paket
      WHERE no_peserta = ? AND flag = 'F'
      ORDER BY dateupd DESC
      LIMIT 1;
    `;

    const pool = await connectToDatabaseMDPLK();
    const [result] = await pool.execute(query, [no_peserta]);

    if (result.length > 0) {
        return response(res, {
          code: 200,
          success: true,
          message: `Successfully retrieved last package data!`,
          content: result,
        });
    } else {
        throw new NotFoundError(`Last package data with username: ${no_peserta} not found!`);
    }
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

exports.pengkinianData = async (req, res) => {
  try {
    const { no_peserta } = req.params;
    const { 
        nama, tgl_lahir, tmp_lahir, noktp, npwp, jenis_kelamin, ibu_kandung, hp, alamat_jalan, 
        alamat_rtrw, alamat_kelurahan, alamat_kecamatan, alamat_kota, alamat_propinsi, alamat_kode_pos, 
        email, pekerjaan, pemilikan, nama_perusahaan, bidangpekerjaan, penghasilantetap, penghasilantidaktetap
    } = req.body;
    const userUpdate = req.user.username;

    // Only allow user to update their own data
    if (no_peserta !== userUpdate) {
        return response(res, {
        code: 403,
        success: false,
        message: 'You are not authorized to edit another user!',
        });
    }

    // Sanitize inputs
    const inputs = [
      nama, tgl_lahir, tmp_lahir, noktp, npwp, jenis_kelamin, ibu_kandung, hp, alamat_jalan, 
      alamat_rtrw, alamat_kelurahan, alamat_kecamatan, alamat_kota, alamat_propinsi, alamat_kode_pos, 
      email, pekerjaan, pemilikan, nama_perusahaan, bidangpekerjaan, penghasilantetap, penghasilantidaktetap
    ];

    for (let input of inputs) {
      if (sanitizeInput(input)) {
        return response(res, {
          code: 400,
          success: false,
          message: 'Input contains invalid characters!',
        });
      }
    }

    // Encode inputs
    const sanitizedValues = inputs.map(input => encode(input));

    // Check uploaded image
    if (!req.file) {
        return response(res, {
            code: 400,
            success: false,
            message: 'Please upload the image!',
        });
    }

    const file = req.file;
    let content = '';

    if (file) {
        const fileType = file.mimetype.split('/')[1];
        const allowTypes = ['jpeg', 'png', 'jpg'];

        if (!allowTypes.includes(fileType)) {
            return res.status(400).json({ message: 'Sorry, only JPG, JPEG and PNG files are allowed.' });
        }
        
        const fileSizeInMB = file.size / (1024 * 1024);
        if (fileSizeInMB > 6) {
            return res.status(400).json({ message: 'File size should not exceed 6 MB.' });
        }

        content = fs.readFileSync(file.path, 'base64');
    }

    const query = `
        INSERT INTO test_pengkinian_data (
            userid, no_peserta, nama_lengkap, tanggal_lahir, tempat_lahir, no_identitas_diri, npwp, jenis_kelamin, ibu_kandung, nohp, 
            alamat_jalan, alamat_rtrw, alamat_kelurahan, alamat_kecamatan, alamat_kota, alamat_propinsi, alamat_kode_pos, email, 
            pekerjaan, pemilikan, nama_perusahaan, bidang_pekerjaan, penghasilan_tetap, penghasilan_tidak_tetap, flag, dateadd, 
            useradd, dateupd, document
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'F', NOW(), ?, NOW(), ?)
    `;

    const values = [
      no_peserta,
      no_peserta,
      ...sanitizedValues,
      no_peserta,
      content
    ];

    const pool = await connectToDatabaseMDPLK();
    await pool.query(query, values);

    return response(res, {
      code: 200,
      success: true,
      message: 'Data updated successfully.',
    });
  } catch (error) {  
    return response(res, {
      code: 500,
      success: false,
      message: error.message || 'Something went wrong!',
    });
  }
};

exports.ubahUsia = async (req, res) => {
  try {
    const { no_peserta } = req.params;
    const {
        nama, usia_lama, usia, usia_baru
    } = req.body;
    const userUpdate = req.user.username;

    // Only allow user to update their own data
    if (no_peserta !== userUpdate) {
        return response(res, {
        code: 403,
        success: false,
        message: 'You are not authorized to edit another user!',
        });
    }

    // Validate to ensure new_age is greater than old_age
    if (usia_baru <= usia_lama) {
        return response(res, {
          code: 400,
          success: false,
          message: 'Usia pensiun baru tidak boleh kurang dari atau sama dengan usia pensiun lama.',
        });
    }

    // Validate to ensure new_age is greater than age
    if (usia_baru <= usia) {
        return response(res, {
          code: 400,
          success: false,
          message: 'Usia pensiun baru tidak boleh kurang dari atau sama dengan usia di tahun ini.',
        });
    }

    // Sanitize inputs
    const inputs = [
      nama, usia_lama, usia, usia_baru
    ];

    for (let input of inputs) {
      if (sanitizeInput(input)) {
        return response(res, {
          code: 400,
          success: false,
          message: 'Input contains invalid characters!',
        });
      }
    }

    // Encode inputs
    const sanitizedValues = inputs.map(input => encode(input));

    const query = `
        INSERT INTO test_usia_pensiun (
            no_peserta, nama_lengkap, usia_old, umur, usia_now, userid, lastupdate
        ) VALUES (?, ?, ?, ?, ?, ?, NOW())
    `;

    const values = [
      no_peserta,
      ...sanitizedValues,
      no_peserta,
    ];

    const pool = await connectToDatabaseMDPLK();
    await pool.query(query, values);

    return response(res, {
      code: 200,
      success: true,
      message: 'Data updated successfully.',
    });
  } catch (error) {  
    return response(res, {
      code: 500,
      success: false,
      message: error.message || 'Something went wrong!',
    });
  }
};

exports.ubahPaket = async (req, res) => {
  try {
    const { no_peserta } = req.params;
    const {
        nama, kode_paket_lama, kode_paket_baru
    } = req.body;
    const userUpdate = req.user.username;

    // Only allow user to update their own data
    if (no_peserta !== userUpdate) {
        return response(res, {
        code: 403,
        success: false,
        message: 'You are not authorized to edit another user!',
        });
    }

    // Check if kode_paket_baru is the same as kode_paket_lama
    if (kode_paket_baru === kode_paket_lama) {
      return response(res, {
        code: 400,
        success: false,
        message: 'Kode paket baru tidak boleh sama dengan kode paket lama!',
      });
    }

    // Sanitize inputs
    const inputs = [
        nama, kode_paket_lama, kode_paket_baru
    ];

    for (let input of inputs) {
      if (sanitizeInput(input)) {
        return response(res, {
          code: 400,
          success: false,
          message: 'Input contains invalid characters!',
        });
      }
    }

    // Encode inputs
    const sanitizedValues = inputs.map(input => encode(input));

    const query = `
        INSERT INTO test_pindah_paket (
            userid, no_peserta, nama_lengkap, kode_paket_lama, kode_paket_baru, flag, dateadd, useradd, dateupd
        ) VALUES (?, ?, ?, ?, ?, 'F', NOW(), ?, NOW())
    `;

    const values = [
      no_peserta,
      no_peserta,
      ...sanitizedValues,
      no_peserta,
    ];

    const pool = await connectToDatabaseMDPLK();
    await pool.query(query, values);

    return response(res, {
      code: 200,
      success: true,
      message: 'Data updated successfully.',
    });
  } catch (error) {  
    return response(res, {
      code: 500,
      success: false,
      message: error.message || 'Something went wrong!',
    });
  }
};

exports.approvePaket = async (req, res) => {
  try {
    const { no_peserta } = req.params;
    const userUpdate = req.user.username;
    const role = req.user.role;

    // Only allow user to update their own data
    if (role !== 'admin') {
        return response(res, {
        code: 403,
        success: false,
        message: 'Access denied!',
        });
    }

    const query = `
        UPDATE test_pindah_paket SET flag = 'T', dateupd = NOW(), useradd = ?
        WHERE userid = ?
    `;

    const values = [
      userUpdate,
      no_peserta,
    ];

    const pool = await connectToDatabaseMDPLK();
    await pool.query(query, values);

    return response(res, {
      code: 200,
      success: true,
      message: 'Data updated successfully.',
    });
  } catch (error) {  
    return response(res, {
      code: 500,
      success: false,
      message: error.message || 'Something went wrong!',
    });
  }
};

exports.lifeCycleFund = async (req, res) => {
  try {
    const { no_peserta } = req.params;
    const { 
        nama, kode_paket_lama, kode_paket_baru, pindah, telepon, email
    } = req.body;
    const userUpdate = req.user.username;

    // Only allow user to update their own data
    if (no_peserta !== userUpdate) {
        return response(res, {
        code: 403,
        success: false,
        message: 'You are not authorized to edit another user!',
        });
    }

    // Sanitize inputs
    const inputs = [
        nama, kode_paket_lama, kode_paket_baru, pindah, telepon, email
    ];

    for (let input of inputs) {
      if (sanitizeInput(input)) {
        return response(res, {
          code: 400,
          success: false,
          message: 'Input contains invalid characters!',
        });
      }
    }

    // Encode inputs
    const sanitizedValues = inputs.map(input => encode(input));

    const query = `
        INSERT INTO test_lcf (
            userid, no_peserta, nama_lengkap, kode_paket_lama, kode_paket_baru, pindah, telepon, email, dateadd
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, NOW())
    `;

    const values = [
      no_peserta,
      no_peserta,
      ...sanitizedValues,
    ];

    const pool = await connectToDatabaseMDPLK();
    await pool.query(query, values);

    return response(res, {
      code: 200,
      success: true,
      message: 'Data updated successfully.',
    });
  } catch (error) {  
    return response(res, {
      code: 500,
      success: false,
      message: error.message || 'Something went wrong!',
    });
  }
};

