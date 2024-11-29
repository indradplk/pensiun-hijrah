const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const Announcement = db.define('Announcement', {
    title: { type: DataTypes.STRING },
    seo: { type: DataTypes.STRING },
    path_announcement:{
        type: DataTypes.STRING,
        allowNull: false
    },
    document:{
        type: DataTypes.STRING,
        allowNull: true
    },
    description:{
        type: DataTypes.TEXT,
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
    tableName: 'announcement',
    timestamps: true
});

module.exports = Announcement;