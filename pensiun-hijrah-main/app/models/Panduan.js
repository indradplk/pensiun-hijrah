const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const Panduan = db.define('Panduan', {
    title: { type: DataTypes.STRING },
    path_panduan:{
        type: DataTypes.STRING,
        allowNull: true
    },
    kategori: {
        type: DataTypes.ENUM('peserta', 'iuran', 'klaim', 'pengalihan', 'formulir', 'brosur', 'pojk', 'pdp'),
        allowNull: false
    },
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
    tableName: 'panduan',
    timestamps: true
});

module.exports = Panduan;