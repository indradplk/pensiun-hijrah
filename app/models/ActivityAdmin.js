const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const ActivityAdmin = db.define('ActivityAdmin', {
    nik: { type: DataTypes.STRING },
    log: { type: DataTypes.STRING },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    tableName: 'log-admin',
    timestamps: true
});

module.exports = ActivityAdmin;
