const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const Video = db.define('Video', {
    title: { type: DataTypes.STRING },
    link: { type: DataTypes.STRING },
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
    tableName: 'video',
    timestamps: true
});

module.exports = Video;