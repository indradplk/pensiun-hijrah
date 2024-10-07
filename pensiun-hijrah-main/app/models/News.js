const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const News = db.define('News', {
    title: { type: DataTypes.STRING },
    seo: { type: DataTypes.STRING },
    path_news:{
        type: DataTypes.STRING,
        allowNull: false
    },
    description:{
        type: DataTypes.TEXT,
        allowNull: false
    },
    kategori: {
        type: DataTypes.ENUM('artikel', 'berita'),
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
    tableName: 'news',
    timestamps: true
});

module.exports = News;