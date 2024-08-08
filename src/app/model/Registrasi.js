const Sequelize = require('sequelize');
const moment = require('moment-timezone');
const db = require('../config/db.js');

const validateDate = (dateTEXT) => {
    const date = new Date(dateTEXT);
    return isNaN(date.getTime()) ? null : moment(date).format('YYYY-MM-DD HH:mm:ss');
};

const Registrasi = db.define(
    "registrasi",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        no_peserta: { 
            type: Sequelize.TEXT,
            allowNull: true,
        },
        nama: { type: Sequelize.TEXT },
        tempat_lahir: { type: Sequelize.TEXT },
        tanggal_lahir: { 
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('tanggal_lahir')).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            }
        },
        jenis_identitas: { type: Sequelize.TEXT },
        no_identitas: { type: Sequelize.TEXT },
        alamat: { type: Sequelize.TEXT },
        rtrw: { type: Sequelize.TEXT },
        kelurahan: { type: Sequelize.TEXT },
        kecamatan: { type: Sequelize.TEXT },
        kota: { type: Sequelize.TEXT },
        provinsi: { type: Sequelize.TEXT },
        kodepos: { type: Sequelize.TEXT },
        warganegara: { type: Sequelize.TEXT },
        jenis_kelamin: { type: Sequelize.TEXT },
        agama: { type: Sequelize.TEXT },
        ibu_kandung: { type: Sequelize.TEXT },
        npwp: { type: Sequelize.TEXT },
        alamat_rumah: { type: Sequelize.TEXT },
        rtrw_rumah: { type: Sequelize.TEXT },
        kelurahan_rumah: { type: Sequelize.TEXT },
        kecamatan_rumah: { type: Sequelize.TEXT },
        kota_rumah: { type: Sequelize.TEXT },
        provinsi_rumah: { type: Sequelize.TEXT },
        kodepos_rumah: { type: Sequelize.TEXT },
        pendidikan: { type: Sequelize.TEXT },
        perkawinan: { type: Sequelize.TEXT },
        email: {
            type: Sequelize.TEXT,
            validate: {
                isEmail: true
            }
        },
        no_hp: { type: Sequelize.TEXT },
        no_telp: { 
            type: Sequelize.TEXT,
            allowNull: true,
        },
        pekerjaan: { type: Sequelize.TEXT },
        perusahaan: { type: Sequelize.TEXT },
        pemilikan: { type: Sequelize.TEXT },
        bidang_pekerjaan: { type: Sequelize.TEXT },
        alamat_kantor: { type: Sequelize.TEXT },
        rtrw_kantor: { type: Sequelize.TEXT },
        kelurahan_kantor: { type: Sequelize.TEXT },
        kecamatan_kantor: { type: Sequelize.TEXT },
        kota_kantor: { type: Sequelize.TEXT },
        provinsi_kantor: { type: Sequelize.TEXT },
        kodepos_kantor: { type: Sequelize.TEXT },
        penghasilan_tetap: { type: Sequelize.TEXT },
        penghasilan_tidak_tetap: { type: Sequelize.TEXT },
        penghasilan_tambahan: { type: Sequelize.TEXT },
        usia_pensiun: { type: Sequelize.TEXT },
        iuran: { type: Sequelize.TEXT },
        pembayaran_iuran: { type: Sequelize.TEXT },
        paket_investasi: { type: Sequelize.TEXT },
        peserta_pengalihan: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        nama_pengalihan: { 
            type: Sequelize.TEXT,
            allowNull: true
        },
        peserta_dapen: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        nama_dapen: { 
            type: Sequelize.TEXT,
            allowNull: true
        },
        dana_rekening: { type: Sequelize.TEXT },
        dana_iuran: { type: Sequelize.TEXT },
        rekening_muamalat: { 
            type: Sequelize.TEXT,
            allowNull: true
        },
        no_rekening_muamalat: { 
            type: Sequelize.TEXT,
            allowNull: true
        },
        rekening_1: { 
            type: Sequelize.TEXT,
            allowNull: true
        },
        no_rekening_1: { 
            type: Sequelize.TEXT,
            allowNull: true
        },
        rekening_2: { 
            type: Sequelize.TEXT,
            allowNull: true
        },
        no_rekening_2: { 
            type: Sequelize.TEXT,
            allowNull: true
        },
        kode_cab_daftar: { type: Sequelize.TEXT },
        nama_ahli_waris_1: { type: Sequelize.TEXT },
        tanggal_lahir_ahli_waris_1: { 
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('tanggal_lahir_ahli_waris_1')).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            }
        },
        jenis_kelamin_ahli_waris_1: { type: Sequelize.TEXT },
        hubungan_ahli_waris_1: { type: Sequelize.TEXT },
        nama_ahli_waris_2: { 
            type: Sequelize.TEXT,
            allowNull: true
        },
        tanggal_lahir_ahli_waris_2: { 
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('tanggal_lahir_ahli_waris_2')).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            },
            allowNull: true
        },
        jenis_kelamin_ahli_waris_2: { 
            type: Sequelize.TEXT,
            allowNull: true
        },
        hubungan_ahli_waris_2: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        nama_ahli_waris_3: { 
            type: Sequelize.TEXT,
            allowNull: true
        },
        tanggal_lahir_ahli_waris_3: { 
            type: Sequelize.DATE,
            get() {
                return moment(this.getDataValue('tanggal_lahir_ahli_waris_3')).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            },
            allowNull: true
        },
        jenis_kelamin_ahli_waris_3: { 
            type: Sequelize.TEXT,
            allowNull: true
        },
        hubungan_ahli_waris_3: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        no_referensi: {
            type: Sequelize.TEXT,
            allowNull: true
        },
        foto_ktp:{
            type:Sequelize.TEXT
        },
        foto_npwp:{
            type:Sequelize.TEXT
        },
        foto_kk:{
            type:Sequelize.TEXT
        },
        status: {
            type: Sequelize.BOOLEAN,
            allowNull: true
        },
        userUpdate: {
            type: Sequelize.TEXT,
            defaultValue: 'SYSTEM'
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            get() {
                return moment(this.getDataValue('createdAt')).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            get() {
                return moment(this.getDataValue('updatedAt')).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            }
        }
    },
    {
        freezeTableName: true,
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
