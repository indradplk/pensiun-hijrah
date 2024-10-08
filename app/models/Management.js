const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const Management = db.define('Management', {
    nama: { type: DataTypes.STRING },
    jabatan: { type: DataTypes.STRING },
    path_management:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    kategori: {
        type: DataTypes.ENUM('pengurus', 'pendiri', 'pengawas', 'dps'),
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
    tableName: 'management',
    timestamps: true
});

module.exports = Management;