const Sequelize = require('sequelize');
const moment = require('moment-timezone');
const db = require('../config/db.js');

const RegisPerusahaan = db.define(
    "registrasi-perusahaan",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nama: { type: Sequelize.STRING },
        pic: { type: Sequelize.STRING },
        jabatan: { type: Sequelize.STRING },
        no_telepon: { type: Sequelize.STRING },
        email: {
            type: Sequelize.STRING,
            allowNull: true,
            isEmail: true
        },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        },
        userUpdate: {
            type: Sequelize.STRING,
            defaultValue: 'SYSTEM'
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            get() {
                return moment(this.getDataValue('createdAt')).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            }
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW,
            get() {
                return moment(this.getDataValue('updatedAt')).tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss');
            }
        }
    },
    {
        freezeTableName: true,
        timestamps: true
    }
);

module.exports = RegisPerusahaan;
