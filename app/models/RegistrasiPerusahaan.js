const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const RegistrasiPerusahaan = db.define(
    "registrasi-perusahaan",
    {
        nama: { type: DataTypes.TEXT },
        pic: { type: DataTypes.TEXT },
        jabatan: { type: DataTypes.TEXT },
        no_telepon: { type: DataTypes.TEXT },
        email: {
            type: DataTypes.TEXT,
            validate: {
                isEmail: true
            }
        },
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        userUpdate: {
            type: DataTypes.TEXT,
            defaultValue: 'SYSTEM'
        }
    },
    {
        tableName: 'registrasi-perusahaan',
        timestamps: true,
    }
);

module.exports = RegistrasiPerusahaan;
