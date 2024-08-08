const Registrasi = require('../model/Registrasi')
const RegisPerusahaan = require('../model/RegistrasiPerusahaan')
const ActivityAdmin = require('../model/ActivityAdmin')
const { Op } = require('sequelize')
const path = require('path')
const fs = require('fs')

exports.index = async (req, res) => {
    try {
        const statusFilter = req.query.status;
        const whereClause = {};

        // Jika filter tersedia dan valid, tambahkan filter berdasarkan status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        const getAllRegistrasi = await Registrasi.findAll({
            where: whereClause
        });
        res.status(200).json(getAllRegistrasi);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.show = async (req, res) => {
    try {
        const id = req.params.id;
        const getRegistrasi = await Registrasi.findOne({
            where: { id: id }
        });
        res.status(200).json(getRegistrasi);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.create = async (req, res) => {
    try {
        const { nama, tempat_lahir, tanggal_lahir, jenis_identitas, no_identitas, alamat, rtrw, kelurahan, kecamatan, kota, provinsi, kodepos, warganegara, jenis_kelamin, agama, 
            ibu_kandung, npwp, alamat_rumah, rtrw_rumah, kelurahan_rumah, kecamatan_rumah, kota_rumah, provinsi_rumah, kodepos_rumah, pendidikan, perkawinan, email,
            no_hp, no_telp, pekerjaan, perusahaan, pemilikan, bidang_pekerjaan, alamat_kantor, rtrw_kantor, kelurahan_kantor, kecamatan_kantor, kota_kantor, provinsi_kantor, kodepos_kantor,
            penghasilan_tetap, penghasilan_tidak_tetap, penghasilan_tambahan, usia_pensiun, iuran, pembayaran_iuran, paket_investasi,
            peserta_pengalihan, nama_pengalihan, peserta_dapen, nama_dapen, dana_rekening, dana_iuran, rekening_muamalat, no_rekening_muamalat, rekening_1, no_rekening_1, rekening_2, no_rekening_2,
            nama_ahli_waris_1, tanggal_lahir_ahli_waris_1, jenis_kelamin_ahli_waris_1, hubungan_ahli_waris_1, nama_ahli_waris_2, tanggal_lahir_ahli_waris_2, jenis_kelamin_ahli_waris_2, hubungan_ahli_waris_2,
            nama_ahli_waris_3, tanggal_lahir_ahli_waris_3, jenis_kelamin_ahli_waris_3, hubungan_ahli_waris_3, no_referensi, kode_cab_daftar
        } = req.body;

        // Cek apakah semua gambar diupload
        if (!req.files || !req.files.foto_ktp || req.files.foto_ktp.length === 0 || !req.files.foto_npwp || req.files.foto_npwp.length === 0 || !req.files.foto_kk || req.files.foto_kk.length === 0) {
            return res.status(400).json({ message: "Silakan unggah gambar Kartu Identitas/NPWP/Kartu Keluarga!" });
        }

        if (!nama || !nama_ahli_waris_1 || !ibu_kandung) {
            return res.status(400).json({ message: "Nama harus diisi!" });
        }

        if (!tempat_lahir || !tanggal_lahir || !tanggal_lahir_ahli_waris_1) {
            return res.status(400).json({ message: "Tempat/Tanggal Lahir harus diisi!" });
        }

        if (!jenis_identitas || !no_identitas) {
            return res.status(400).json({ message: "Jenis/Nomor Identitas harus diisi!" });
        }

        if (!alamat || !rtrw || !kelurahan || !kecamatan || !kota || !provinsi || !kodepos ||
            !alamat_rumah || !rtrw_rumah || !kelurahan_rumah || !kecamatan_rumah || !kota_rumah || !provinsi_rumah || !kodepos_rumah ||
            !alamat_kantor || !rtrw_kantor || !kelurahan_kantor || !kecamatan_kantor || !kota_kantor || !provinsi_kantor || !kodepos_kantor) {
            return res.status(400).json({ message: "Alamat harus diisi!" });
        }

        if (!jenis_kelamin || !jenis_kelamin_ahli_waris_1) {
            return res.status(400).json({ message: "Jenis Kelamin harus diisi!" });
        }

        if (!warganegara) {
            return res.status(400).json({ message: "Kewarganegaraan harus diisi!" });
        }

        if (!no_hp || !npwp) {
            return res.status(400).json({ message: "Nomor harus diisi!" });
        }

        if (!dana_rekening || !dana_iuran) {
            return res.status(400).json({ message: "Sumber dana harus diisi!" });
        }

        if (!email || !isValidEmail(email)) {
            return res.status(400).json({ message: "Email harus diisi dan valid!" });
        }

        if (!penghasilan_tetap || !penghasilan_tidak_tetap || !penghasilan_tambahan) {
            return res.status(400).json({ message: "Penghasilan harus diisi!" });
        }

        if (!iuran || !pembayaran_iuran) {
            return res.status(400).json({ message: "Jumlah/Sistem Iuran harus diisi!" });
        }

        if (!paket_investasi) {
            return res.status(400).json({ message: "Paket Investasi harus diisi!" });
        }

        if(!peserta_pengalihan || !peserta_dapen) {
            return res.status(400).json({ message: "Peserta Pengalihan/Dana Pensiun Lain harus diisi!" });
        }

        if(!agama) {
            return res.status(400).json({ message: "Agama harus diisi!" });
        }

        if(!pendidikan) {
            return res.status(400).json({ message: "Pendidikan Terakhir harus diisi!" });
        }

        if(!perkawinan || !hubungan_ahli_waris_1) {
            return res.status(400).json({ message: "Status/Hubungan harus diisi!" });
        }

        if(!pekerjaan || !perusahaan || !pemilikan || !bidang_pekerjaan) {
            return res.status(400).json({ message: "Pekerjaan harus diisi!" });
        }

        if(!usia_pensiun) {
            return res.status(400).json({ message: "Usia Pensiun harus diisi!" });
        }

        if(!kode_cab_daftar) {
            return res.status(400).json({ message: "Cabang pendaftaran harus diisi!" });
        }

        const foto_ktp = `${path.relative('../../../html/pensiun-hijrah/public/peserta/registrasi', req.files.foto_ktp[0].path)}`;
        const foto_npwp = `${path.relative('../../../html/pensiun-hijrah/public/peserta/registrasi', req.files.foto_npwp[0].path)}`;
        const foto_kk = `${path.relative('../../../html/pensiun-hijrah/public/peserta/registrasi', req.files.foto_kk[0].path)}`;

        // Validasi form
        const newRegistrasi = await Registrasi.create({
            nama, tempat_lahir, tanggal_lahir, jenis_identitas, no_identitas, alamat, rtrw, kelurahan, kecamatan, kota, provinsi, kodepos, warganegara, jenis_kelamin, agama, 
            ibu_kandung, npwp, alamat_rumah, rtrw_rumah, kelurahan_rumah, kecamatan_rumah, kota_rumah, provinsi_rumah, kodepos_rumah, pendidikan, perkawinan, email,
            no_hp, no_telp, pekerjaan, perusahaan, pemilikan, bidang_pekerjaan, alamat_kantor, rtrw_kantor, kelurahan_kantor, kecamatan_kantor, kota_kantor, provinsi_kantor, kodepos_kantor,
            penghasilan_tetap, penghasilan_tidak_tetap, penghasilan_tambahan, usia_pensiun, iuran, pembayaran_iuran, paket_investasi,
            peserta_pengalihan, nama_pengalihan, peserta_dapen, nama_dapen, dana_rekening, dana_iuran, rekening_muamalat, no_rekening_muamalat, rekening_1, no_rekening_1, rekening_2, no_rekening_2,
            nama_ahli_waris_1, tanggal_lahir_ahli_waris_1, jenis_kelamin_ahli_waris_1, hubungan_ahli_waris_1, nama_ahli_waris_2, tanggal_lahir_ahli_waris_2, jenis_kelamin_ahli_waris_2, hubungan_ahli_waris_2,
            nama_ahli_waris_3, tanggal_lahir_ahli_waris_3, jenis_kelamin_ahli_waris_3, hubungan_ahli_waris_3, no_referensi, foto_ktp, foto_npwp, foto_kk, kode_cab_daftar
        });

        const message = "Registrasi Peserta berhasil!";
        res.json({ newRegistrasi, message });
    } catch (err) {
        if (req.files && req.files.foto_ktp && req.files.foto_ktp.length > 0) {
            fs.unlinkSync(req.files.foto_ktp[0].path);
        }
        if (req.files && req.files.foto_npwp && req.files.foto_npwp.length > 0) {
            fs.unlinkSync(req.files.foto_npwp[0].path);
        }
        if (req.files && req.files.foto_kk && req.files.foto_kk.length > 0) {
            fs.unlinkSync(req.files.foto_kk[0].path);
        }
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.indexPerusahaan = async (req, res) => {
    try {
        const statusFilter = req.query.status;
        const whereClause = {};

        // Jika filter tersedia dan valid, tambahkan filter berdasarkan status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        const getRegisPerusahaan = await RegisPerusahaan.findAll({
            attributes: ['id', 'nama', 'pic', 'jabatan', 'email', 'no_telepon', 'status', 'userUpdate', 'createdAt'],
            where: whereClause,
        });
        res.json(getRegisPerusahaan);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.showPerusahaan = async (req, res) => {
    try {
        const id = req.params.id;
        const getRegisPerusahaan = await RegisPerusahaan.findOne({
            where: { id: id },
            attributes: ['id', 'nama', 'pic', 'jabatan', 'email', 'no_telepon', 'status', 'userUpdate', 'createdAt']
        });
        res.json(getRegisPerusahaan);
    } catch (err) {
        console.error(err.message);
        res.status(500).json(err);
    }
}

exports.updatePerusahaan = async (req, res) => {
    try {
        const { id } = req.params;
        const { namaAdmin, nik, email } = req.body;

        // Cek apakah Mail dengan ID yang diberikan ada
        const existingRegisPerusahaan = await RegisPerusahaan.findByPk(id);
        if (!existingRegisPerusahaan) {
            return res.status(400).json({ message: "Email tidak ditemukan!" });
        }

        // Validasi form
        if (!nik) {
            return res.status(400).json({ message: "NIK harus diisi!" });
        }

        // Update status to true
        const editRegisPerusahaan = await existingRegisPerusahaan.update({
            userUpdate: nik, status: true
        });

        await ActivityAdmin.create({
            nik: nik,
            log: `${namaAdmin} (${nik}) telah merespon email pendaftaran perusahaan dari ${email}`
        });

        const message = "Email berhasil diperbarui!";
        res.json({ editRegisPerusahaan, message });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Terjadi kesalahan server." });
    }
}

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}