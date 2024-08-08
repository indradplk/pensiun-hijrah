const Sequelize = require('sequelize');
const moment = require('moment-timezone');
const db = require('../config/db.js');

const TanyaDPLK = db.define(
    "tanya-dplk",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: { type: Sequelize.STRING },
        subject: { type: Sequelize.STRING },
        email: {
            type: Sequelize.STRING,
            isEmail: true
        },
        no_telp: { type: Sequelize.STRING },
        text: { type: Sequelize.STRING },
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

module.exports = TanyaDPLK;
