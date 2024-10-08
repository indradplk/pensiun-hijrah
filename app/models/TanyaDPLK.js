const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const TanyaDPLK = db.define('TanyaDPLK', {
    name: { type: DataTypes.STRING },
    subject: {
        type: DataTypes.ENUM('Tanya DPLK - Pertanyaan Umum', 'Tanya DPLK - Informasi Produk', 'Tanya DPLK - Kendala Teknis di Website', 'Tanya DPLK - Transaksi', 'Tanya DPLK - MDIN'),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        isEmail: true
    },
    no_telp: { type: DataTypes.STRING },
    text: { type: DataTypes.STRING },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    userUpdate: {
        type: DataTypes.STRING,
        defaultValue: 'SYSTEM',
        allowNull: false
    }
}, {
    tableName: 'tanya-dplk',
    timestamps: true
});

module.exports = TanyaDPLK;
