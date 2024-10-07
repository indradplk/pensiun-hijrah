const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const Report = db.define('Report', {
    title: { type: DataTypes.STRING },
    path_report:{
        type: DataTypes.STRING,
        allowNull: true
    },
    kategori: {
        type: DataTypes.ENUM('investasi', 'keuangan', 'pengawas'),
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
    tableName: 'report',
    timestamps: true
});

module.exports = Report;