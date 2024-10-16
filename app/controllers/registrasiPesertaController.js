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

        // Check uploaded document
        if (!req.files || !req.files.foto_ktp || req.files.foto_ktp.length === 0 || !req.files.foto_npwp || req.files.foto_npwp.length === 0 || !req.files.foto_kk || req.files.foto_kk.length === 0) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Please upload the document!',
            });
        }

        if (!nama || !nama_ahli_waris_1 || !ibu_kandung) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Name must be filled in!',
            });
        }

        if (!tempat_lahir || !tanggal_lahir || !tanggal_lahir_ahli_waris_1) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Place and date of birth must be filled in!',
            });
        }

        if (!jenis_identitas || !no_identitas) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Identity Type/Number must be filled in!',
            });
        }

        if (!alamat || !rtrw || !kelurahan || !kecamatan || !kota || !provinsi || !kodepos ||
            !alamat_rumah || !rtrw_rumah || !kelurahan_rumah || !kecamatan_rumah || !kota_rumah || !provinsi_rumah || !kodepos_rumah ||
            !alamat_kantor || !rtrw_kantor || !kelurahan_kantor || !kecamatan_kantor || !kota_kantor || !provinsi_kantor || !kodepos_kantor) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Address must be filled in!',
            });
        }

        if (!jenis_kelamin || !jenis_kelamin_ahli_waris_1) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Gender must be filled in!',
            });
        }

        if (!warganegara) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Citizenship must be filled in!',
            });
        }

        if (!no_hp) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Mobile number must be filled in!',
            });
        }

        if (!npwp) {
            return response(res, {
                code: 400,
                success: false,
                message: 'NPWP must be filled in!',
            });
        }

        if (!dana_rekening || !dana_iuran) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Funding sources must be filled in!',
            });
        }

        if (!email || !isValidEmail(email)) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Email must be filled in and valid!',
            });
        }

        if (!penghasilan_tetap || !penghasilan_tidak_tetap || !penghasilan_tambahan) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Income must be filled in!',
            });
        }

        if (!iuran || !pembayaran_iuran) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Contribution Amount/System must be filled in!',
            });
        }

        if (!paket_investasi) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Investment package must be filled in!',
            });
        }

        if(!peserta_pengalihan || !peserta_dapen) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Other pension fund participants must be filled in!',
            });
        }

        if(!agama) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Religion must be filled in!',
            });
        }

        if(!pendidikan) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Last education must be filled in!',
            });
        }

        if(!perkawinan || !hubungan_ahli_waris_1) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Status/Relationship must be filled in!',
            });
        }

        if(!pekerjaan || !perusahaan || !pemilikan || !bidang_pekerjaan) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Jobs must be filled in!',
            });
        }

        if(!usia_pensiun) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Retirement age must be filled in!',
            });
        }

        if(!kode_cab_daftar) {
            return response(res, {
                code: 400,
                success: false,
                message: 'Branch offices must be filled in!',
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