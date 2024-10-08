const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const Award = db.define('Award', {
    description:{
        type: DataTypes.STRING,
        allowNull: false
    },
    path_award:{
        type: DataTypes.STRING,
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
    tableName: 'award',
    timestamps: true
});

module.exports = Award;