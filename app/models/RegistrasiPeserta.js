const { DataTypes } = require('sequelize');
const { db } = require('../config/db');
const moment = require('moment-timezone');

const validateDate = (dateTEXT) => {
    const date = new Date(dateTEXT);
    return isNaN(date.getTime()) ? null : moment(date).format('YYYY-MM-DD HH:mm:ss');
};

const Registrasi = db.define(
    "Registrasi",
    {
        no_peserta: { 
            type: DataTypes.TEXT,
            allowNull: true,
        },
        nama: { type: DataTypes.TEXT },
        tempat_lahir: { type: DataTypes.TEXT },
        tanggal_lahir: { 
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('tanggal_lahir')).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            }
        },
        jenis_identitas: { type: DataTypes.TEXT },
        no_identitas: { type: DataTypes.TEXT },
        alamat: { type: DataTypes.TEXT },
        rtrw: { type: DataTypes.TEXT },
        kelurahan: { type: DataTypes.TEXT },
        kecamatan: { type: DataTypes.TEXT },
        kota: { type: DataTypes.TEXT },
        provinsi: { type: DataTypes.TEXT },
        kodepos: { type: DataTypes.TEXT },
        warganegara: { type: DataTypes.TEXT },
        jenis_kelamin: { type: DataTypes.TEXT },
        agama: { type: DataTypes.TEXT },
        ibu_kandung: { type: DataTypes.TEXT },
        npwp: { type: DataTypes.TEXT },
        alamat_rumah: { type: DataTypes.TEXT },
        rtrw_rumah: { type: DataTypes.TEXT },
        kelurahan_rumah: { type: DataTypes.TEXT },
        kecamatan_rumah: { type: DataTypes.TEXT },
        kota_rumah: { type: DataTypes.TEXT },
        provinsi_rumah: { type: DataTypes.TEXT },
        kodepos_rumah: { type: DataTypes.TEXT },
        pendidikan: { type: DataTypes.TEXT },
        perkawinan: { type: DataTypes.TEXT },
        email: {
            type: DataTypes.TEXT,
            validate: {
                isEmail: true
            }
        },
        no_hp: { type: DataTypes.TEXT },
        no_telp: { 
            type: DataTypes.TEXT,
            allowNull: true,
        },
        pekerjaan: { type: DataTypes.TEXT },
        perusahaan: { type: DataTypes.TEXT },
        pemilikan: { type: DataTypes.TEXT },
        bidang_pekerjaan: { type: DataTypes.TEXT },
        alamat_kantor: { type: DataTypes.TEXT },
        rtrw_kantor: { type: DataTypes.TEXT },
        kelurahan_kantor: { type: DataTypes.TEXT },
        kecamatan_kantor: { type: DataTypes.TEXT },
        kota_kantor: { type: DataTypes.TEXT },
        provinsi_kantor: { type: DataTypes.TEXT },
        kodepos_kantor: { type: DataTypes.TEXT },
        penghasilan_tetap: { type: DataTypes.TEXT },
        penghasilan_tidak_tetap: { type: DataTypes.TEXT },
        penghasilan_tambahan: { type: DataTypes.TEXT },
        usia_pensiun: { type: DataTypes.TEXT },
        iuran: { type: DataTypes.TEXT },
        pembayaran_iuran: { type: DataTypes.TEXT },
        paket_investasi: { type: DataTypes.TEXT },
        peserta_pengalihan: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        nama_pengalihan: { 
            type: DataTypes.TEXT,
            allowNull: true
        },
        peserta_dapen: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        nama_dapen: { 
            type: DataTypes.TEXT,
            allowNull: true
        },
        dana_rekening: { type: DataTypes.TEXT },
        dana_iuran: { type: DataTypes.TEXT },
        rekening_muamalat: { 
            type: DataTypes.TEXT,
            allowNull: true
        },
        no_rekening_muamalat: { 
            type: DataTypes.TEXT,
            allowNull: true
        },
        rekening_1: { 
            type: DataTypes.TEXT,
            allowNull: true
        },
        no_rekening_1: { 
            type: DataTypes.TEXT,
            allowNull: true
        },
        rekening_2: { 
            type: DataTypes.TEXT,
            allowNull: true
        },
        no_rekening_2: { 
            type: DataTypes.TEXT,
            allowNull: true
        },
        kode_cab_daftar: { type: DataTypes.TEXT },
        nama_ahli_waris_1: { type: DataTypes.TEXT },
        tanggal_lahir_ahli_waris_1: { 
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('tanggal_lahir_ahli_waris_1')).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            }
        },
        jenis_kelamin_ahli_waris_1: { type: DataTypes.TEXT },
        hubungan_ahli_waris_1: { type: DataTypes.TEXT },
        nama_ahli_waris_2: { 
            type: DataTypes.TEXT,
            allowNull: true
        },
        tanggal_lahir_ahli_waris_2: { 
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('tanggal_lahir_ahli_waris_2')).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            },
            allowNull: true
        },
        jenis_kelamin_ahli_waris_2: { 
            type: DataTypes.TEXT,
            allowNull: true
        },
        hubungan_ahli_waris_2: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        nama_ahli_waris_3: { 
            type: DataTypes.TEXT,
            allowNull: true
        },
        tanggal_lahir_ahli_waris_3: { 
            type: DataTypes.DATE,
            get() {
                return moment(this.getDataValue('tanggal_lahir_ahli_waris_3')).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            },
            allowNull: true
        },
        jenis_kelamin_ahli_waris_3: { 
            type: DataTypes.TEXT,
            allowNull: true
        },
        hubungan_ahli_waris_3: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        no_referensi: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        foto_ktp:{
            type:DataTypes.TEXT
        },
        foto_npwp:{
            type:DataTypes.TEXT
        },
        foto_kk:{
            type:DataTypes.TEXT
        },
        status: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        userUpdate: {
            type: DataTypes.TEXT,
            defaultValue: 'SYSTEM'
        }
    },
    {
        tableName: 'registrasi-peserta',
        timestamps: true,
        hooks: {
            beforeCreate: (registrasi, options) => {
                registrasi.tanggal_lahir = validateDate(registrasi.tanggal_lahir);
                registrasi.tanggal_lahir_ahli_waris_1 = validateDate(registrasi.tanggal_lahir_ahli_waris_1);
                registrasi.tanggal_lahir_ahli_waris_2 = validateDate(registrasi.tanggal_lahir_ahli_waris_2);
                registrasi.tanggal_lahir_ahli_waris_3 = validateDate(registrasi.tanggal_lahir_ahli_waris_3);
            },
            beforeUpdate: (registrasi, options) => {
                registrasi.tanggal_lahir = validateDate(registrasi.tanggal_lahir);
                registrasi.tanggal_lahir_ahli_waris_1 = validateDate(registrasi.tanggal_lahir_ahli_waris_1);
                registrasi.tanggal_lahir_ahli_waris_2 = validateDate(registrasi.tanggal_lahir_ahli_waris_2);
                registrasi.tanggal_lahir_ahli_waris_3 = validateDate(registrasi.tanggal_lahir_ahli_waris_3);
            }
        }
    }
);

module.exports = Registrasi;
