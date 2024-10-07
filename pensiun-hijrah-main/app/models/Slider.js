const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const Slider = db.define('Slider', {
    judul: { type: DataTypes.STRING },
    path_web:{
        type: DataTypes.STRING,
        allowNull: true
    },
    path_mobile:{
        type: DataTypes.STRING,
        allowNull: true
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
    tableName: 'slider',
    timestamps: true
});

module.exports = Slider;