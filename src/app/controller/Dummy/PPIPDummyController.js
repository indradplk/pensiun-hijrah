const db = require('../../config/dummy')

async function show(req, res) {
    const { noPeserta } = req.params;
    const query = `
        SELECT n.no_peserta , n.NO_IDENTITAS_DIRI , n.NPWP , n.nama_lengkap , n.ALAMAT_EMAIL , n.JENIS_KELAMIN , n.alamat_jalan , n.alamat_rtrw , n.alamat_kelurahan , n.ALAMAT_KECAMATAN , n.alamat_kota , n.ALAMAT_PROPINSI , n.alamat_kode_pos , n.tempat_lahir , n.alamat_telepon ,
        DATE_FORMAT(n.tanggal_lahir, '%d/%m/%Y') AS tanggal_lahir ,
        DATE_FORMAT(n.tgl_registrasi, '%d/%m/%Y') AS tgl_registrasi ,
        DATE_FORMAT(r.tgl_pensiun, '%d/%m/%Y') AS tgl_pensiun ,
        DATE_FORMAT(r.tgl_pensiun_dipercepat, '%d/%m/%Y') AS tgl_pensiun_dipercepat ,
        r.kode_paket_investasi , n.ibu_kandung , r.usia_pensiun , n.pekerjaan , n.kode_pemilikan , r.penghasilan_tetap , n.nama_perusahaan , n.kode_jenis_usaha , r.penghasilan_tidak_tetap , r.STATUS_DPLK 
        FROM TRANSAKSIDPLK t
        INNER JOIN NASABAHDPLK n ON n.no_peserta = t.NO_PESERTA
        INNER JOIN REKENINGDPLK r ON r.no_peserta = t.NO_PESERTA
        WHERE n.no_peserta = '${noPeserta}' AND t.ISCOMMITTED = 'T'
        GROUP BY n.no_peserta , n.NO_IDENTITAS_DIRI , n.NPWP , n.nama_lengkap , n.ALAMAT_EMAIL , n.JENIS_KELAMIN , n.alamat_jalan , n.alamat_rtrw , n.alamat_kelurahan , n.ALAMAT_KECAMATAN , n.alamat_kota , n.ALAMAT_PROPINSI , n.alamat_kode_pos, n.alamat_telepon , n.tempat_lahir , n.tanggal_lahir , n.tgl_registrasi ,
        r.tgl_pensiun , r.tgl_pensiun_dipercepat , r.kode_paket_investasi , n.ibu_kandung , r.usia_pensiun , n.pekerjaan , n.kode_pemilikan , r.penghasilan_tetap , n.nama_perusahaan , n.kode_jenis_usaha , r.penghasilan_tidak_tetap , r.STATUS_DPLK`;

    try {
        db.query(query, (err, result) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).json({ message: 'Server error' });
            }

            if (result.length > 0) {
                res.json(result);
            } else {
                console.error('Peserta tidak ditemukan.');
                return res.status(404).json({ message: 'Peserta tidak ditemukan.' });
            }
        });
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
        CAST(ROUND(SUM(IFNULL(t.MUTASI_IURAN_PST, 0.0)), 2) AS DECIMAL(18, 2)) AS AKUM_IURAN_PASTI,
        CAST(ROUND(SUM(IFNULL(t.MUTASI_IURAN_PK, 0.0)), 2) AS DECIMAL(18, 2)) AS AKUM_IURAN_PK,
        CAST(ROUND(SUM(IFNULL(t.MUTASI_PENGEMBANGAN, 0.0)), 2) AS DECIMAL(18, 2)) AS AKUM_PENGEMBANGAN,
        CAST(ROUND(SUM(IFNULL(t.MUTASI_PERALIHAN, 0.0)), 2) AS DECIMAL(18, 2)) AS AKUM_PERALIHAN,
        CAST(ROUND(SUM(IFNULL(t.MUTASI_IURAN_PST, 0.0)) + SUM(IFNULL(t.MUTASI_IURAN_PK, 0.0)) + SUM(IFNULL(t.MUTASI_PENGEMBANGAN, 0.0)) + SUM(IFNULL(t.MUTASI_PERALIHAN, 0.0)), 2) AS DECIMAL(18, 2)) AS TOTAL_DANA
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
        db.query(query, (err, result) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).json({ message: 'Server error' });
            }

            if (result.length > 0) {
                res.json(result);
            } else {
                console.error('Saldo tidak ditemukan.');
                return res.status(404).json({ message: 'Saldo tidak ditemukan.' });
            }
        });
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
        db.query(query, (err, result) => {
            if (err) {
                console.error('Error querying database:', err);
                return res.status(500).json({ message: 'Server error' });
            }

            if (result.length > 0) {
                res.json(result);
            } else {
                console.error('Transaksi tidak ditemukan.');
                return res.status(404).json({ message: 'Transaksi tidak ditemukan.' });
            }
        });
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
    show, balance, transaction
};