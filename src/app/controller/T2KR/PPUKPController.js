// const { connectToDatabasePPUKP } = require('../../config/ppukp')
const { connectToDatabasePPUKP } = require('../../config/dplk07_query')

async function index(req, res) {
    const { kode_korporat } = req.params;
    const query = `
    SELECT n.no_peserta , n.nama_lengkap , n.KODE_NASABAH_CORPORATE, n.ALAMAT_EMAIL , n.alamat_telepon ,
    CONVERT(VARCHAR, n.tanggal_lahir, 103) AS tanggal_lahir ,
    CONVERT(VARCHAR, n.tgl_registrasi, 103) AS tgl_registrasi ,
    CONVERT(VARCHAR, r.tgl_pensiun, 103) AS tgl_pensiun ,
    CONVERT(VARCHAR, r.tgl_pensiun_dipercepat, 103) AS tgl_pensiun_dipercepat ,
    r.kode_paket_investasi , r.usia_pensiun , r.STATUS_DPLK
    FROM TRANSAKSIDPLK t
    INNER JOIN NASABAHDPLK n ON n.no_peserta = t.NO_PESERTA
    INNER JOIN REKENINGDPLK r ON r.no_peserta = t.NO_PESERTA
    WHERE n.KODE_NASABAH_CORPORATE = '${kode_korporat}' AND t.ISCOMMITTED = 'T'
    GROUP BY n.no_peserta , n.nama_lengkap , n.KODE_NASABAH_CORPORATE , n.ALAMAT_EMAIL , n.alamat_telepon , n.tanggal_lahir , n.tgl_registrasi ,
    r.tgl_pensiun , r.tgl_pensiun_dipercepat , r.kode_paket_investasi , r.usia_pensiun , r.STATUS_DPLK`;

    try {
        const pool = await connectToDatabasePPUKP();
        const result = await pool.request().query(query);
        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).json({ error: 'Peserta tidak ditemukan' });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function show(req, res) {
    const { noPeserta } = req.params;
    const query = `
    SELECT n.no_peserta , n.NPWP , n.nama_lengkap , n.KODE_NASABAH_CORPORATE , n.ALAMAT_EMAIL , n.alamat_jalan , n.alamat_rtrw , n.alamat_kelurahan , n.ALAMAT_KECAMATAN , n.alamat_kota , n.ALAMAT_PROPINSI , n.alamat_kode_pos , n.alamat_telepon ,
    CONVERT(VARCHAR, n.tanggal_lahir, 103) AS tanggal_lahir ,
    CONVERT(VARCHAR, n.tgl_registrasi, 103) AS tgl_registrasi ,
    CONVERT(VARCHAR, r.tgl_pensiun, 103) AS tgl_pensiun ,
    CONVERT(VARCHAR, r.tgl_pensiun_dipercepat, 103) AS tgl_pensiun_dipercepat ,
    r.kode_paket_investasi , r.usia_pensiun , n.pekerjaan , n.kode_pemilikan , n.nama_perusahaan , n.kode_jenis_usaha , r.STATUS_DPLK 
    FROM TRANSAKSIDPLK t
    INNER JOIN NASABAHDPLK n ON n.no_peserta = t.NO_PESERTA
    INNER JOIN REKENINGDPLK r ON r.no_peserta = t.NO_PESERTA
    WHERE n.no_peserta = '${noPeserta}' AND t.ISCOMMITTED = 'T'
    GROUP BY n.no_peserta , n.NPWP , n.nama_lengkap , n.KODE_NASABAH_CORPORATE , n.ALAMAT_EMAIL , n.alamat_jalan , n.alamat_rtrw , n.alamat_kelurahan , n.ALAMAT_KECAMATAN , n.alamat_kota , n.ALAMAT_PROPINSI , n.alamat_kode_pos, n.alamat_telepon , n.tanggal_lahir , n.tgl_registrasi ,
    r.tgl_pensiun , r.tgl_pensiun_dipercepat , r.kode_paket_investasi , r.usia_pensiun , n.pekerjaan , n.kode_pemilikan , n.nama_perusahaan , n.kode_jenis_usaha , r.STATUS_DPLK`;

    try {
        const pool = await connectToDatabasePPUKP();
        const result = await pool.request().query(query);
        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).json({ error: 'Peserta tidak ditemukan' });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function balance(req, res) {
    const { noPeserta } = req.params;
    const { start_date, end_date } = req.query;
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
            WHERE n.no_peserta = '${noPeserta}' AND t.ISCOMMITTED = 'T'`;

    if (start_date && end_date) {
        // Validate start_date and end_date format
        if (!isValidDate(start_date) || !isValidDate(end_date)) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        query += `
        AND t.TGL_TRANSAKSI BETWEEN '${start_date}' AND '${end_date}'`;
    }

    if (start_date && !end_date) {
        query += `
        AND t.TGL_TRANSAKSI >= '${start_date}'`;
    }

    if (!start_date && end_date) {
        query += `
        AND t.TGL_TRANSAKSI < '${end_date}'`;
    }

    query += `
    GROUP BY n.no_peserta , n.nama_lengkap`;

    try {
        const pool = await connectToDatabasePPUKP();
        const result = await pool.request().query(query);
        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).json({ error: 'Balance not found' });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function transaction(req, res) {
    const { noPeserta } = req.params;
    const { start_date, end_date } = req.query;

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
        AND ISCOMMITTED = 'T'`;

    if (start_date && end_date) {
        // Validate start_date and end_date format
        if (!isValidDate(start_date) || !isValidDate(end_date)) {
            return res.status(400).json({ error: 'Invalid date format' });
        }

        query += `
        AND TGL_TRANSAKSI BETWEEN '${start_date}' AND '${end_date}'`;
    }

    if (start_date && !end_date) {
        query += `
        AND TGL_TRANSAKSI >= '${start_date}'`;
    }

    query += `
    ORDER BY TGL_TRANSAKSI ASC`;

    try {
        const pool = await connectToDatabasePPUKP();
        const result = await pool.request().query(query);
        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).json({ error: 'Transaction not found' });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

function isValidDate(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString);
}

module.exports = {
    index, show, balance, transaction
};