const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const Office = db.define('Office', {
        kode_cabang: { type: DataTypes.INTEGER },
        nama: { type: DataTypes.STRING },
        cabang: { type: DataTypes.STRING },
        area: { type: DataTypes.STRING },
        alamat: { type: DataTypes.STRING },
        telepon: { type: DataTypes.STRING },
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
        tableName: 'office',
        timestamps: true
    });

module.exports = Office;