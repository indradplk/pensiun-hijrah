const { connectToDatabasePPUKP } = require('../../config/db_ppukp_test');
const { response } = require('../../helpers/bcrypt');
const { NotFoundError } = require('../../errors');
const sanitizeInput = require('../../helpers/sanitizeInput');

function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
}

exports.getOne = async (req, res) => {
  try {
    const { noPeserta } = req.params;
    const userUpdate = req.user.username;
    const role = req.user.role;

    // Only allow user to see themselves
    if (role !== 'admin' && noPeserta !== userUpdate) { 
      return response(res, {
        code: 403,
        success: false,
        message: 'You are not authorized to see another user!',
      });
    }

    const query = `
      SELECT n.no_peserta , n.NO_IDENTITAS_DIRI , n.NPWP , n.nama_lengkap , n.ALAMAT_EMAIL , n.JENIS_KELAMIN , n.alamat_jalan , n.alamat_rtrw , n.alamat_kelurahan , n.ALAMAT_KECAMATAN , n.alamat_kota , n.ALAMAT_PROPINSI , n.alamat_kode_pos , n.tempat_lahir , n.alamat_telepon ,
      CONVERT(VARCHAR, n.tanggal_lahir, 103) AS tanggal_lahir ,
      CONVERT(VARCHAR, n.tgl_registrasi, 103) AS tgl_registrasi ,
      CONVERT(VARCHAR, r.tgl_pensiun, 103) AS tgl_pensiun ,
      CONVERT(VARCHAR, r.tgl_pensiun_dipercepat, 103) AS tgl_pensiun_dipercepat ,
      r.kode_paket_investasi , n.ibu_kandung , r.usia_pensiun , n.pekerjaan , n.kode_pemilikan , r.penghasilan_tetap , n.nama_perusahaan , n.kode_jenis_usaha , r.penghasilan_tidak_tetap , r.STATUS_DPLK 
      FROM TRANSAKSIDPLK t
      INNER JOIN NASABAHDPLK n ON n.no_peserta = t.NO_PESERTA
      INNER JOIN REKENINGDPLK r ON r.no_peserta = t.NO_PESERTA
      WHERE n.no_peserta = '${noPeserta}' AND t.ISCOMMITTED = 'T'
      GROUP BY n.no_peserta , n.NO_IDENTITAS_DIRI , n.NPWP , n.nama_lengkap , n.ALAMAT_EMAIL , n.JENIS_KELAMIN , n.alamat_jalan , n.alamat_rtrw , n.alamat_kelurahan , n.ALAMAT_KECAMATAN , n.alamat_kota , n.ALAMAT_PROPINSI , n.alamat_kode_pos, n.alamat_telepon , n.tempat_lahir , n.tanggal_lahir , n.tgl_registrasi ,
      r.tgl_pensiun , r.tgl_pensiun_dipercepat , r.kode_paket_investasi , n.ibu_kandung , r.usia_pensiun , n.pekerjaan , n.kode_pemilikan , r.penghasilan_tetap , n.nama_perusahaan , n.kode_jenis_usaha , r.penghasilan_tidak_tetap , r.STATUS_DPLK
    `;

    const pool = await connectToDatabasePPUKP();
    const result = await pool.request().query(query);

    if (result.recordset.length > 0) {
        return response(res, {
          code: 200,
          success: true,
          message: `Successfully retrieved user data!`,
          content: result.recordset,
        });
    } else {
        throw new NotFoundError(`User with username: ${noPeserta} not found!`);
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

exports.getBalance = async (req, res) => {
  try {
    const { noPeserta } = req.params;
    const { start_date, end_date } = req.query;
    const userUpdate = req.user.username;

    // Only allow user to see themselves
    if (noPeserta !== userUpdate) {
      return response(res, {
        code: 403,
        success: false,
        message: 'You are not authorized to see another user!',
      });
    }
  
    let query = `
      SELECT n.no_peserta , n.nama_lengkap ,
      CAST(ROUND(SUM(ISNULL(t.MUTASI_IURAN_PST, 0.0)), 2) AS DECIMAL(18, 2)) AS AKUM_IURAN_PASTI,
      CAST(ROUND(SUM(ISNULL(t.MUTASI_IURAN_PK, 0.0)), 2) AS DECIMAL(18, 2)) AS AKUM_IURAN_PK,
      CAST(ROUND(SUM(ISNULL(t.MUTASI_PENGEMBANGAN, 0.0)), 2) AS DECIMAL(18, 2)) AS AKUM_PENGEMBANGAN,
      CAST(ROUND(SUM(ISNULL(t.MUTASI_PERALIHAN, 0.0)), 2) AS DECIMAL(18, 2)) AS AKUM_PERALIHAN,
      CAST(ROUND(SUM(ISNULL(t.MUTASI_IURAN_PST, 0.0)) + SUM(ISNULL(t.MUTASI_IURAN_PK, 0.0)) + SUM(ISNULL(t.MUTASI_PENGEMBANGAN, 0.0)) + SUM(ISNULL(t.MUTASI_PERALIHAN, 0.0)), 2) AS DECIMAL(18, 2)) AS TOTAL_DANA
        FROM TRANSAKSIDPLK t
        INNER JOIN NASABAHDPLK n ON n.no_peserta = t.NO_PESERTA
        INNER JOIN REKENINGDPLK r ON r.no_peserta = t.NO_PESERTA
         WHERE n.no_peserta = '${noPeserta}' AND t.ISCOMMITTED = 'T'
    `;

    if (start_date && end_date) {
      // Validate start_date and end_date format
      if (!isValidDate(start_date) || !isValidDate(end_date)) {
        return response(res, {
          code: 404,
          success: false,
          message: 'Invalid date format',
        });
      }

      query += `AND t.TGL_TRANSAKSI BETWEEN '${start_date}' AND '${end_date}'`;
    }

    if (start_date && !end_date) {
      query += `
      AND t.TGL_TRANSAKSI >= '${start_date}'`;
    }

    if (!start_date && end_date) {
      query += `AND t.TGL_TRANSAKSI < '${end_date}'`;
    }

    query += `GROUP BY n.no_peserta , n.nama_lengkap`;
  
    const pool = await connectToDatabasePPUKP();
    const result = await pool.request().query(query);
  
    if (result.recordset.length > 0) {
      return response(res, {
        code: 200,
        success: true,
        message: `Successfully retrieved balance data!`,
        content: result.recordset,
      });
    } else {
      throw new NotFoundError(`Balance with username: ${noPeserta} not found!`);
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

exports.getTransaction = async (req, res) => {
  try {
    const { noPeserta } = req.params;
    const { start_date, end_date } = req.query;
    const userUpdate = req.user.username;

    // Only allow user to see themselves
    if (noPeserta !== userUpdate) {
      return response(res, {
        code: 403,
        success: false,
        message: 'You are not authorized to see another user!',
      });
    }
  
    let query = `
      SELECT
        ID_TRANSAKSI,
        FORMAT(TGL_TRANSAKSI, 'yyyy-MM-dd') AS TGL_TRANSAKSI,
        KETERANGAN,
        ROUND(MUTASI_IURAN_PST, 2) AS MUTASI_IURAN_PST,
        ROUND(MUTASI_IURAN_PK, 2) AS MUTASI_IURAN_PK,
        ROUND(MUTASI_PENGEMBANGAN, 2) AS MUTASI_PENGEMBANGAN,
        ROUND(MUTASI_PERALIHAN, 2) AS MUTASI_PERALIHAN
      FROM
        TRANSAKSIDPLK
      WHERE
        NO_PESERTA = '${noPeserta}'
        AND ISCOMMITTED = 'T'
    `;

    if (start_date && end_date) {
      // Validate start_date and end_date format
      if (!isValidDate(start_date) || !isValidDate(end_date)) {
        return response(res, {
          code: 404,
          success: false,
          message: 'Invalid date format',
        });
      }

      query += `AND TGL_TRANSAKSI BETWEEN '${start_date}' AND '${end_date}'`;
    }

    if (start_date && !end_date) {
      query += `AND TGL_TRANSAKSI >= '${start_date}'`;
    }

    if (!start_date && end_date) {
      query += `AND TGL_TRANSAKSI < '${end_date}'`;
    }

    query += `ORDER BY TGL_TRANSAKSI ASC`;
  
    const pool = await connectToDatabasePPUKP();
    const result = await pool.request().query(query);
  
    if (result.recordset.length > 0) {
      return response(res, {
        code: 200,
        success: true,
        message: `Successfully retrieved transaction data!`,
        content: result.recordset,
      });
    } else {
      throw new NotFoundError(`Transaction with username: ${noPeserta} not found!`);
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