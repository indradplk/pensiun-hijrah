// const { connectToDatabasePPIP } = require('../../config/ppip')
const { connectToDatabasePPIP } = require('../../config/templk')
const ActivityAdmin = require('../../model/ActivityAdmin')

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
        const pool = await connectToDatabasePPIP();
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
        r.tgl_pensiun , r.tgl_pensiun_dipercepat , r.kode_paket_investasi , n.ibu_kandung , r.usia_pensiun , n.pekerjaan , n.kode_pemilikan , r.penghasilan_tetap , n.nama_perusahaan , n.kode_jenis_usaha , r.penghasilan_tidak_tetap , r.STATUS_DPLK`;

    try {
        const pool = await connectToDatabasePPIP();
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
        const pool = await connectToDatabasePPIP();
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
        const pool = await connectToDatabasePPIP();
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

async function parameter(req, res) {
    const { key_parameter } = req.params;
    const query = `
        SELECT * FROM PARAMETER
        WHERE KEY_PARAMETER = '${key_parameter}'`;

    try {
        const pool = await connectToDatabasePPIP();
        const result = await pool.request().query(query);
        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).json({ error: 'Parameter tidak ditemukan' });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateParameter(req, res) {
    const { key_parameter } = req.params;
    const { value, nama, userUpdate } = req.body;

    const query = `
    UPDATE PARAMETER
        SET NUMERIC_VALUE = @value
    WHERE KEY_PARAMETER = '${key_parameter}'`;

    try {
        const pool = await connectToDatabasePPIP();
        const request = pool.request();
        request.input('value', value);

        await request.query(query);

        await ActivityAdmin.create({
            nik: userUpdate,
            log: `${nama} (${userUpdate}) mengubah parameter ${key_parameter} menjadi ${value}%`
        });

        res.status(200).json({ message: 'Parameter Berhasil Diperbarui!' });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function lastPackage(req, res) {
    const { noPeserta } = req.params;

    const query = `
    SELECT top 1 no_peserta, (CAST(CAST(getdate() AS DATETIME ) AS INTEGER) - CAST(CAST(CONVERT(VARCHAR(10),tgl_transaksi ,101) AS DATETIME) AS INTEGER)) AS hari_pindah
	FROM TRANSAKSIDPLK 
	WHERE no_peserta= '${noPeserta}'
	AND kode_jenis_transaksi = 'F'
	ORDER BY tgl_transaksi DESC`;

    try {
        const pool = await connectToDatabasePPIP();
        const result = await pool.request().query(query);
        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).json({ error: 'Tidak ada perubahan paket investasi terakhir.' });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function usiaPensiun(req, res) {
    const { noPeserta } = req.params;

    const query = `
    SELECT 
        r.no_peserta, 
        n.nama_lengkap,
        r.kode_paket_investasi, 
        n.tanggal_lahir, 
        n.tgl_registrasi,
        r.tgl_pensiun, 
        r.tgl_pensiun_dipercepat, 
        r.usia_pensiun,
        DATEDIFF(YEAR, n.tanggal_lahir, GETDATE()) - 
        CASE 
            WHEN MONTH(n.tanggal_lahir) > MONTH(GETDATE()) OR 
                (MONTH(n.tanggal_lahir) = MONTH(GETDATE()) AND DAY(n.tanggal_lahir) > DAY(GETDATE())) 
            THEN 1 
            ELSE 0 
        END AS usia_saat_ini,
        DATEDIFF(YEAR, n.tanggal_lahir, GETDATE()) AS usia_tahun_ini
    FROM 
        NASABAHDPLK n 
    JOIN 
        REKENINGDPLK r 
    ON 
        n.no_peserta = r.no_peserta 
    WHERE 
        r.no_peserta = '${noPeserta}'`;

    try {
        const pool = await connectToDatabasePPIP();
        const result = await pool.request().query(query);
        if (result.recordset.length > 0) {
            res.json(result.recordset);
        } else {
            res.status(404).json({ error: 'Tidak ada data usia pensiun.' });
        }
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateUsiaPensiun(req, res) {
    const { noPeserta } = req.params;
    const { usia_baru, tgl_pensiun_baru, tgl_pensiun_dipercepat_baru } = req.body;

    // Validasi untuk memastikan semua field diisi
    if (!usia_baru || !tgl_pensiun_baru || !tgl_pensiun_dipercepat_baru) {
        return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    const query = `
    UPDATE REKENINGDPLK
        SET usia_pensiun = @usia_baru, tgl_pensiun = @tgl_pensiun_baru, tgl_pensiun_dipercepat = @tgl_pensiun_dipercepat_baru, KETERANGAN = 'UPDATE USIA PENSIUN WEBSITE', LAST_UPDATE = GETDATE()
    WHERE no_peserta = @noPeserta`;

    try {
        const pool = await connectToDatabasePPIP();
        const request = pool.request();
        request.input('usia_baru', usia_baru);
        request.input('tgl_pensiun_baru', tgl_pensiun_baru);
        request.input('tgl_pensiun_dipercepat_baru', tgl_pensiun_dipercepat_baru);
        request.input('noPeserta', noPeserta);

        await request.query(query);

        res.status(200).json({ message: 'Usia Pensiun Berhasil Diperbarui!' });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function lifeCycleFund(req, res) {
    const { noPeserta } = req.params;

    try {
        const pool = await connectToDatabasePPIP();

        // DELETE FROM ubah_paket_investasi
        const deleteQuery = `
            DELETE FROM ubah_paket_investasi WHERE no_peserta = '${noPeserta}'
        `;

        await pool.request().query(deleteQuery);

        // INSERT INTO ubah_paket_investasi
        const insertUbahPaketQuery = `
            INSERT INTO ubah_paket_investasi
            SELECT r.no_peserta, r.kode_paket_investasi,
                   SUM(ISNULL(t.MUTASI_IURAN_PST, 0.0)) AS pst,
                   SUM(ISNULL(t.MUTASI_IURAN_PK, 0.0)) AS pk,
                   SUM(ISNULL(t.MUTASI_PENGEMBANGAN, 0.0)) AS pengembangan,
                   SUM(ISNULL(t.MUTASI_PERALIHAN, 0.0)) AS peralihan
            FROM TRANSAKSIDPLK t
            JOIN REKENINGDPLK r ON t.no_peserta = r.no_peserta
            JOIN NASABAHDPLK nd ON nd.no_peserta = r.no_peserta
            WHERE r.STATUS_DPLK = 'A'
              AND t.ISCOMMITTED = 'T'
              AND r.KODE_PAKET_INVESTASI NOT IN ('A')
              AND t.TGL_TRANSAKSI <= GETDATE()
              AND r.no_peserta = '${noPeserta}'
            GROUP BY r.no_peserta, r.kode_paket_investasi
        `;
        await pool.request().query(insertUbahPaketQuery);

        // UPDATE statements
        const updateQueries = [
            `UPDATE ubah_paket_investasi SET AKUM_DANA_PST = 0 WHERE AKUM_DANA_PST <= 0 AND no_peserta = '${noPeserta}'`,
            `UPDATE ubah_paket_investasi SET AKUM_DANA_PK = 0 WHERE AKUM_DANA_PK <= 0 AND no_peserta = '${noPeserta}'`,
            `UPDATE ubah_paket_investasi SET AKUM_DANA_PENGEMBANGAN = 0 WHERE AKUM_DANA_PENGEMBANGAN <= 0 AND no_peserta = '${noPeserta}'`
        ];

        for (const query of updateQueries) {
            await pool.request().query(query);
        }

        // UPDATE id_gen
        const updateIDgen1 = `
            UPDATE id_gen SET last_id = last_id + 1 WHERE id_code = 'TRANSAKSIDPLK'
        `;
        await pool.request().query(updateIDgen1);

        // INSERT INTO TRANSAKSIDPLK
        const insertTransaksiMQuery = `
            INSERT INTO TRANSAKSIDPLK
            SELECT
                ROW_NUMBER() OVER (ORDER BY no_peserta) + (SELECT last_id FROM ID_GEN WHERE id_code = 'TRANSAKSIDPLK') AS Row,
                '${noPeserta}', GETDATE(), GETDATE(), GETDATE(), '${noPeserta}', '10.55.108.171', '10.55.108.171',
                'Transaksi Online penyeimbangan pindah paket investasi LCF dari ' + kode_paket_investasi,
                (akum_dana_pk * -1), (akum_dana_pst * -1), (akum_dana_pengembangan * -1), (akum_dana_peralihan * -1),
                no_peserta, kode_paket_investasi, 'F', 393666, 'T', NULL, NULL, NULL, NULL, NULL, NULL, '000', NULL, NULL,
                NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL
            FROM ubah_paket_investasi
            WHERE NO_PESERTA = '${noPeserta}';
        `;
        await pool.request().query(insertTransaksiMQuery);

        // UPDATE id_gen again
        const updateIDgen2 = `
            UPDATE id_gen SET last_id = last_id + 1 WHERE id_code = 'TRANSAKSIDPLK'
        `;
        await pool.request().query(updateIDgen2);

        // UPDATE ubah_paket_investasi
        const updatePaket = `
            UPDATE ubah_paket_investasi SET kode_paket_investasi = 'A' WHERE no_peserta = '${noPeserta}'
        `;
        await pool.request().query(updatePaket);

        // INSERT INTO TRANSAKSIDPLK again
        const insertTransaksiPQuery = `
            INSERT INTO TRANSAKSIDPLK
            SELECT
                ROW_NUMBER() OVER (ORDER BY no_peserta) + (SELECT last_id FROM ID_GEN WHERE id_code = 'TRANSAKSIDPLK') AS Row,
                   '${noPeserta}', GETDATE(), GETDATE(), GETDATE(), '${noPeserta}', '10.55.108.171', '10.55.108.171',
                   'Transaksi Online penyeimbangan pindah paket investasi LCF ke A',
                   akum_dana_pk, akum_dana_pst, akum_dana_pengembangan, akum_dana_peralihan,
                   no_peserta, 'A', 'F', 393666, 'T', NULL, NULL, NULL, NULL, NULL, NULL, '000', NULL, NULL,
                   NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL
            FROM ubah_paket_investasi
            WHERE no_peserta = '${noPeserta}'
        `;
        await pool.request().query(insertTransaksiPQuery);

        // UPDATE id_gen again
        const updateIDgen3 = `
            UPDATE id_gen SET last_id = last_id + 2 WHERE id_code = 'TRANSAKSIDPLK'
        `;
        await pool.request().query(updateIDgen3);

        // UPDATE REKENINGDPLK
        const updateRekening = `
            UPDATE REKENINGDPLK SET kode_paket_investasi = 'A' WHERE no_peserta = '${noPeserta}'
        `;
        await pool.request().query(updateRekening);

        res.status(200).json({ message: 'Paket Investasi Anda berhasil diubah!' });
    } catch (error) {
        console.error('Error querying database:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function registrasi(req, res) {
    const {
        nama, tempat_lahir, tanggal_lahir, alamat, rtrw, kelurahan, kecamatan, kota, kodepos, no_hp,
        pekerjaan, perusahaan, alamat_kantor, kodepos_kantor, kelurahan_kantor, kecamatan_kantor,
        kota_kantor, provinsi_kantor, alamat_rumah, kelurahan_rumah, kecamatan_rumah, rtrw_rumah, kota_rumah,
        provinsi_rumah, kodepos_rumah, npwp, dana_rekening, no_referensi, pemilikan, bidang_pekerjaan,
        paket_investasi, usia_pensiun, jenis_kelamin, no_telp, email, no_identitas, provinsi, peserta_pengalihan,
        tgl_pensiun, tgl_pensiun_dipercepat, agama, pendidikan, penghasilan_tetap, penghasilan_tidak_tetap, pembayaran_iuran,
        perkawinan, warganegara, ibu_kandung, iuran, kode_provinsi, kode_cab_daftar,
        nama_ahli_waris_1, tanggal_lahir_ahli_waris_1, jenis_kelamin_ahli_waris_1,
        nama_ahli_waris_2, tanggal_lahir_ahli_waris_2, jenis_kelamin_ahli_waris_2,
        nama_ahli_waris_3, tanggal_lahir_ahli_waris_3, jenis_kelamin_ahli_waris_3
    } = req.body;
    
    try {
        const pool = await connectToDatabasePPIP();

        // SELECT MAX ID FROM registernasabahrekening
        const maxQuery = `
            SELECT MAX(REGISTERNR_ID) AS MAX_REGISTERNR_ID FROM registernasabahrekening WHERE USER_ID = 'USERWEB'
        `;

        const maxResult = await pool.request().query(maxQuery);
        const maxId = maxResult.recordset[0].MAX_REGISTERNR_ID || 0;
        const newId = maxId + 1;

        // SELECT MAX ID FROM REGNRAHLIWARIS
        const maxREGNRAHLIWARISQuery = `
            SELECT MAX(REGNRAHLIWARIS_ID) AS MAX_REGNRAHLIWARIS_ID FROM REGNRAHLIWARIS
        `;

        const maxREGNRAHLIWARISResult = await pool.request().query(maxREGNRAHLIWARISQuery);
        const maxREGNRAHLIWARISId = maxREGNRAHLIWARISResult.recordset[0].MAX_REGNRAHLIWARIS_ID || 0;
        const newREGNRAHLIWARISId = maxREGNRAHLIWARISId + 1;

        // INSERT INTO registernasabahrekening
        const insertQuery = `
            INSERT INTO REGISTERNASABAHREKENING
            (
                REGISTERNR_ID, USER_ID, TANGGAL_REGISTER, no_peserta, nama_lengkap, tempat_lahir, tanggal_lahir,
                alamat_jalan, alamat_rtrw, alamat_kelurahan, ALAMAT_KECAMATAN, alamat_kota, alamat_kode_pos, alamat_telepon,
                pekerjaan, nama_perusahaan, alamat_kantor_jalan, alamat_kantor_kode_pos, ALAMAT_KANTOR_KELURAHAN, ALAMAT_KANTOR_KECAMATAN,
                alamat_kantor_kota, alamat_kantor_propinsi, ALAMAT_SURAT_JALAN, ALAMAT_SURAT_KELURAHAN,
                ALAMAT_SURAT_KECAMATAN, ALAMAT_SURAT_RTRW, ALAMAT_SURAT_KOTA, ALAMAT_SURAT_PROPINSI, ALAMAT_SURAT_KODE_POS, NPWP,
                kode_cab_daftar, STATUS_BIAYA_DAFTAR, sumber_dana, NO_REFERENSI, KODE_PEMILIKAN, KODE_JENIS_USAHA, KODE_NASABAH_CORPORATE,
                KODE_PAKET_INVESTASI, USIA_PENSIUN, JENIS_KELAMIN, ALAMAT_TELEPON2, ALAMAT_EMAIL, NO_IDENTITAS_DIRI,
                ALAMAT_PROPINSI, ALAMAT_SURAT_TELEPON, ALAMAT_SURAT_TELEPON2, ISPESERTAPENGALIHAN, TGL_PENSIUN, TGL_PENSIUN_DIPERCEPAT,
                AGAMA, PENDIDIKAN_TERAKHIR, PENGHASILAN_TETAP, PENGHASILAN_TIDAK_TETAP, SISTEM_PEMBAYARAN_IURAN, STATUS_PERKAWINAN, KEWARGANEGARAAN,
                ibu_kandung, IURAN_PST, KODE_PROPINSI
            )
            VALUES 
            (
                @newId, 'USERWEB', GETDATE(), @newId, @nama, @tempat_lahir, @tanggal_lahir,
                @alamat, @rtrw, @kelurahan, @kecamatan, @kota, @kodepos, @no_hp,
                @pekerjaan, @perusahaan, @alamat_kantor, @kodepos_kantor, @kelurahan_kantor, @kecamatan_kantor,
                @kota_kantor, @provinsi_kantor, @alamat_rumah, @kelurahan_rumah,
                @kecamatan_rumah, @rtrw_rumah, @kota_rumah, @provinsi_rumah, @kodepos_rumah, @npwp,
                @kode_cab_daftar, 'F', @dana_rekening, @no_referensi, @pemilikan, @bidang_pekerjaan, 'RETAIL',
                @paket_investasi, @usia_pensiun, @jenis_kelamin, @no_telp, @email, @no_identitas,
                @provinsi, @no_hp, @no_telp, @peserta_pengalihan, @tgl_pensiun, @tgl_pensiun_dipercepat,
                @agama, @pendidikan, @penghasilan_tetap, @penghasilan_tidak_tetap, @pembayaran_iuran, @perkawinan, @warganegara,
                @ibu_kandung, @iuran, @kode_provinsi
            )
        `;
        
        await pool.request()
            .input('newId', newId)
            .input('nama', nama)
            .input('tempat_lahir', tempat_lahir)
            .input('tanggal_lahir', tanggal_lahir)
            .input('alamat', alamat)
            .input('rtrw', rtrw)
            .input('kelurahan', kelurahan)
            .input('kecamatan', kecamatan)
            .input('kota', kota)
            .input('kodepos', kodepos)
            .input('no_hp', no_hp)
            .input('pekerjaan', pekerjaan)
            .input('perusahaan', perusahaan)
            .input('alamat_kantor', alamat_kantor)
            .input('kodepos_kantor', kodepos_kantor)
            .input('kelurahan_kantor', kelurahan_kantor)
            .input('kecamatan_kantor', kecamatan_kantor)
            .input('kota_kantor', kota_kantor)
            .input('provinsi_kantor', provinsi_kantor)
            .input('alamat_rumah', alamat_rumah)
            .input('kelurahan_rumah', kelurahan_rumah)
            .input('kecamatan_rumah', kecamatan_rumah)
            .input('rtrw_rumah', rtrw_rumah)
            .input('kota_rumah', kota_rumah)
            .input('provinsi_rumah', provinsi_rumah)
            .input('kodepos_rumah', kodepos_rumah)
            .input('npwp', npwp)
            .input('dana_rekening', dana_rekening)
            .input('no_referensi', no_referensi)
            .input('pemilikan', pemilikan)
            .input('bidang_pekerjaan', bidang_pekerjaan)
            .input('paket_investasi', paket_investasi)
            .input('usia_pensiun', usia_pensiun)
            .input('jenis_kelamin', jenis_kelamin)
            .input('no_telp', no_telp)
            .input('email', email)
            .input('no_identitas', no_identitas) 
            .input('provinsi', provinsi)
            .input('peserta_pengalihan', peserta_pengalihan)
            .input('tgl_pensiun', tgl_pensiun)
            .input('tgl_pensiun_dipercepat', tgl_pensiun_dipercepat)
            .input('agama', agama)
            .input('pendidikan', pendidikan)
            .input('penghasilan_tetap', penghasilan_tetap)
            .input('penghasilan_tidak_tetap', penghasilan_tidak_tetap)
            .input('pembayaran_iuran', pembayaran_iuran)
            .input('perkawinan', perkawinan)
            .input('warganegara', warganegara)
            .input('ibu_kandung', ibu_kandung)
            .input('iuran', iuran)
            .input('kode_provinsi', kode_provinsi)
            .input('kode_cab_daftar', kode_cab_daftar)
            .query(insertQuery);
        
        // Insert into REGNRAHLIWARIS if ahli waris data is provided
        const ahliWarisData = [
            { id: 1, nama: nama_ahli_waris_1, tanggal_lahir: tanggal_lahir_ahli_waris_1, jenis_kelamin: jenis_kelamin_ahli_waris_1 },
            { id: 2, nama: nama_ahli_waris_2, tanggal_lahir: tanggal_lahir_ahli_waris_2, jenis_kelamin: jenis_kelamin_ahli_waris_2 },
            { id: 3, nama: nama_ahli_waris_3, tanggal_lahir: tanggal_lahir_ahli_waris_3, jenis_kelamin: jenis_kelamin_ahli_waris_3 }
        ];

        for (const ahliWaris of ahliWarisData) {
            if (ahliWaris.id && ahliWaris.nama && ahliWaris.tanggal_lahir && ahliWaris.jenis_kelamin) {
                const insertAhliWarisQuery = `
                    INSERT INTO REGNRAHLIWARIS
                    (REGNRAHLIWARIS_ID, NOMOR_URUT_PRIORITAS, REGISTERNR_ID, NAMA_LENGKAP, TANGGAL_LAHIR, JENIS_KELAMIN, STATUS_AHLI_WARIS)
                    VALUES (@newREGNRAHLIWARISId, @id_ahli_waris, @newId, @nama_ahli_waris, @tanggal_lahir_ahli_waris, @jenis_kelamin_ahli_waris, 'A')
                `;

                await pool.request()
                    .input('newREGNRAHLIWARISId', newREGNRAHLIWARISId)
                    .input('id_ahli_waris', ahliWaris.id)
                    .input('newId', newId)
                    .input('nama_ahli_waris', ahliWaris.nama)
                    .input('tanggal_lahir_ahli_waris', ahliWaris.tanggal_lahir)
                    .input('jenis_kelamin_ahli_waris', ahliWaris.jenis_kelamin)
                    .query(insertAhliWarisQuery);
            }
        }

        res.status(200).json({ message: 'Registration successful' });
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
    index, show, balance, transaction, parameter, updateParameter, lastPackage, usiaPensiun, updateUsiaPensiun, lifeCycleFund, registrasi
};