const RegistrasiPeserta = require('../models/RegistrasiPeserta');
const { NotFoundError } = require('../errors');
const { response, isEmpty } = require('../helpers/bcrypt');
const path = require('path');
const fs = require('fs');

// Function to validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

exports.getAll = async (req, res) => {
    try {
        const statusFilter = req.query.status;
        const whereClause = {}; 
        const role = req.user.role;
        
        if (role !== 'admin') { 
          return response(res, {
            code: 403,
            success: false,
            message: 'Access denied!',
          });
        }

        // filter by status
        if (statusFilter && ['true', 'false'].includes(statusFilter.toLowerCase())) {
            whereClause.status = statusFilter.toLowerCase() === 'true';
        }

        const getAllRegistrasi = await RegistrasiPeserta.findAll({
            where: whereClause,
        })

        if (isEmpty(getAllRegistrasi)) {
            throw new NotFoundError('Registration Data Not Found!');
        }

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved registration data!',
            content: getAllRegistrasi,
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
}

exports.getOne = async (req, res) => {
    try {
        const { id } = req.params; 
        const role = req.user.role;
        
        if (role !== 'admin') { 
          return response(res, {
            code: 403,
            success: false,
            message: 'Access denied!',
          });
        }

        const getRegistrasi = await RegistrasiPeserta.findByPk(id);

        if (!getRegistrasi)
            throw new NotFoundError(`Registration data with id: ${id} not found!`);

        return response(res, {
            code: 200,
            success: true,
            message: 'Successfully retrieved registration data!',
            content: getRegistrasi,
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

        if (!nama || !nama_ahli_waris_1 || !ibu_kandung) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Nama/nama ahli waris/nama ibu kandung wajib diisi!',
            });
        }

        if (!tempat_lahir || !tanggal_lahir || !tanggal_lahir_ahli_waris_1) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Tempat lahir/tanggal lahir/tanggal lahir ahli waris wajib diisi!',
            });
        }

        if (!jenis_identitas || !no_identitas) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Jenis/Nomor identitas wajib diisi!',
            });
        }

        if (!alamat || !rtrw || !kelurahan || !kecamatan || !kota || !provinsi || !kodepos ||
            !alamat_rumah || !rtrw_rumah || !kelurahan_rumah || !kecamatan_rumah || !kota_rumah || !provinsi_rumah || !kodepos_rumah ||
            !alamat_kantor || !rtrw_kantor || !kelurahan_kantor || !kecamatan_kantor || !kota_kantor || !provinsi_kantor || !kodepos_kantor) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Alamat/alamat rumah/alamat kantor wajib diisi!',
            });
        }

        if (!jenis_kelamin || !jenis_kelamin_ahli_waris_1) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Jenis kelamin/jenis kelamin ahli waris wajib diisi!',
            });
        }

        if (!warganegara) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Kewarganegaraan wajib diisi!',
            });
        }

        if (!no_hp) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Nomor HP wajib diisi!',
            });
        }

        if (!npwp) {
            return response(res, {
                code: 400,
                success: false,
                message: 'NPWP wajib diisi!',
            });
        }

        if (!dana_rekening || !dana_iuran) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Sumber dana rekening/iuran wajib diisi!',
            });
        }

        if (!email || !isValidEmail(email)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Email wajib diisi dan valid!',
            });
        }

        if (!penghasilan_tetap || !penghasilan_tidak_tetap || !penghasilan_tambahan) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Penghasilan tetap/tidak tetap/tambahan wajib diisi!',
            });
        }

        if (!iuran || !pembayaran_iuran) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Iuran/Sistem pembayaran iuran wajib diisi!',
            });
        }

        if (!paket_investasi) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Paket investasi wajib diisi!',
            });
        }

        if(!peserta_pengalihan || !peserta_dapen) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Peserta pengalihan/Dapen lain wajib diisi!',
            });
        }

        if(!agama) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Agama wajib diisi!',
            });
        }

        if(!pendidikan) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Pendidikan terakhir wajib diisi!',
            });
        }

        if(!perkawinan || !hubungan_ahli_waris_1) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Status perkawinan/hubungan ahli waris wajib diisi!',
            });
        }

        if(!pekerjaan || !perusahaan || !pemilikan || !bidang_pekerjaan) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Pekerjaan/perusahaan/pemilikan wajib diisi!',
            });
        }

        if(!usia_pensiun) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Usia pensiun wajib diisi!',
            });
        }

        if(!kode_cab_daftar) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Kode cabang daftar wajib diisi!',
            });
        }

        // Check uploaded document
        if (!req.files || !req.files.foto_ktp || req.files.foto_ktp.length === 0 || !req.files.foto_npwp || req.files.foto_npwp.length === 0 || !req.files.foto_kk || req.files.foto_kk.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Silakan upload dokumen KTP/NPWP/Kartu Keluarga!',
            });
        }

        const foto_ktp = `${path.relative('../public/registrasi-peserta', req.files.foto_ktp[0].path)}`;
        const foto_npwp = `${path.relative('../public/registrasi-peserta', req.files.foto_npwp[0].path)}`;
        const foto_kk = `${path.relative('../public/registrasi-peserta', req.files.foto_kk[0].path)}`;

        // Validasi form
        const newRegistrasi = await RegistrasiPeserta.create({
            nama, tempat_lahir, tanggal_lahir, jenis_identitas, no_identitas, alamat, rtrw, kelurahan, kecamatan, kota, provinsi, kodepos, warganegara, jenis_kelamin, agama, 
            ibu_kandung, npwp, alamat_rumah, rtrw_rumah, kelurahan_rumah, kecamatan_rumah, kota_rumah, provinsi_rumah, kodepos_rumah, pendidikan, perkawinan, email,
            no_hp, no_telp, pekerjaan, perusahaan, pemilikan, bidang_pekerjaan, alamat_kantor, rtrw_kantor, kelurahan_kantor, kecamatan_kantor, kota_kantor, provinsi_kantor, kodepos_kantor,
            penghasilan_tetap, penghasilan_tidak_tetap, penghasilan_tambahan, usia_pensiun, iuran, pembayaran_iuran, paket_investasi,
            peserta_pengalihan, nama_pengalihan, peserta_dapen, nama_dapen, dana_rekening, dana_iuran, rekening_muamalat, no_rekening_muamalat, rekening_1, no_rekening_1, rekening_2, no_rekening_2,
            nama_ahli_waris_1, tanggal_lahir_ahli_waris_1, jenis_kelamin_ahli_waris_1, hubungan_ahli_waris_1, nama_ahli_waris_2, tanggal_lahir_ahli_waris_2, jenis_kelamin_ahli_waris_2, hubungan_ahli_waris_2,
            nama_ahli_waris_3, tanggal_lahir_ahli_waris_3, jenis_kelamin_ahli_waris_3, hubungan_ahli_waris_3, no_referensi, foto_ktp, foto_npwp, foto_kk, kode_cab_daftar
        });

        return response(res, {
            code: 200,
            success: true,
            message: 'Registration successfully!',
            content: newRegistrasi,
        });
    } catch (error) {
        if (req.files && req.files.foto_ktp && req.files.foto_ktp.length > 0) {
            fs.unlinkSync(req.files.foto_ktp[0].path);
        }
        if (req.files && req.files.foto_npwp && req.files.foto_npwp.length > 0) {
            fs.unlinkSync(req.files.foto_npwp[0].path);
        }
        if (req.files && req.files.foto_kk && req.files.foto_kk.length > 0) {
            fs.unlinkSync(req.files.foto_kk[0].path);
        }

        return response(res, {
            code: 500,
            success: false,
            message: error.message || 'Something went wrong!',
            content: error,
        });
    }
}