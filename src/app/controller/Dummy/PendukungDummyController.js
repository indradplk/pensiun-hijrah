const mdplk = require('../../config/dummy');
const fs = require('fs');

const getKlaim = (req, res) => {
    const { no_peserta } = req.params;

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

    mdplk.query(query, [no_peserta], (err, result) => {
        if (err) {
            console.error('Error executing query:', err);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (result && result.length > 0) {
            res.status(200).json(result);
        } else {
            res.status(404).json({ message: 'Data not found' });
        }
    });
};

const pengkinianData = (req, res) => {
    const { 
        no_peserta, nama, tgl_lahir, tmp_lahir, noktp, npwp, jenis_kelamin, ibu_kandung, hp, alamat_jalan, 
        alamat_rtrw, alamat_kelurahan, alamat_kecamatan, alamat_kota, alamat_propinsi, alamat_kode_pos, 
        email, pekerjaan, pemilikan, nama_perusahaan, bidangpekerjaan, penghasilantetap, penghasilantidaktetap
    } = req.body;

    // Cek apakah gambar diupload
    if (!req.file) {
        return res.status(400).json({ message: "Silakan unggah gambar!" });
    }

    if (!no_peserta || !nama || !tgl_lahir || !tmp_lahir || !noktp || !npwp || !jenis_kelamin || !ibu_kandung || !hp || !alamat_jalan || 
        !alamat_rtrw || !alamat_kelurahan || !alamat_kecamatan || !alamat_kota || !alamat_propinsi || !alamat_kode_pos ||
        !email || !pekerjaan || !pemilikan || !nama_perusahaan || !bidangpekerjaan || !penghasilantetap || !penghasilantidaktetap) {
        return res.status(400).json({ message: "Semua field harus diisi!" });
    }

    const file = req.file;
    let content = '';

    if (file) {
        const fileType = file.mimetype.split('/')[1];
        const allowTypes = ['jpeg', 'png', 'jpg', 'gif'];

        if (allowTypes.includes(fileType)) {
            content = fs.readFileSync(file.path, 'base64');
        } else {
            return res.status(400).json({ message: 'Maaf, hanya file JPG, JPEG, PNG, dan GIF yang diperbolehkan.' });
        }
    }

    const query = `
        INSERT INTO pengkinian_data (
            userid, no_peserta, nama_lengkap, tanggal_lahir, tempat_lahir, no_identitas_diri, npwp, jenis_kelamin, ibu_kandung, nohp, 
            alamat_jalan, alamat_rtrw, alamat_kelurahan, alamat_kecamatan, alamat_kota, alamat_propinsi, alamat_kode_pos, email, 
            pekerjaan, pemilikan, nama_perusahaan, bidang_pekerjaan, penghasilan_tetap, penghasilan_tidak_tetap, flag, dateadd, 
            useradd, dateupd, document
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'F', NOW(), ?, NOW(), ?)
    `;

    const values = [
        no_peserta, no_peserta, nama, tgl_lahir, tmp_lahir, noktp, npwp, jenis_kelamin, ibu_kandung, hp, alamat_jalan, alamat_rtrw,
        alamat_kelurahan, alamat_kecamatan, alamat_kota, alamat_propinsi, alamat_kode_pos, email, pekerjaan, pemilikan, nama_perusahaan,
        bidangpekerjaan, penghasilantetap, penghasilantidaktetap, no_peserta, content
    ];

    mdplk.query(query, values, (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ message: 'Failed to insert data' });
        }

        res.status(200).json({ message: 'Data uploaded successfully' });
    });
};

module.exports = {
    getKlaim, pengkinianData
};
