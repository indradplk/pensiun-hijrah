const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const Parameter = db.define('Parameter', {
    KEY_PARAMETER: { type: DataTypes.STRING },
    NUMERIC_VALUE: { type: DataTypes.FLOAT },
    VARCHAR_VALUE: {
        type: DataTypes.STRING,
        allowNull: true
    },
    DESCRIPTION: {
        type: DataTypes.STRING,
    },
    status:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
    },
    userUpdate: {
        type: DataTypes.STRING,
        defaultValue: 'SYSTEM',
        allowNull: false
    }
}, {
    tableName: 'parameter',
    timestamps: true
});

module.exports = Parameter;