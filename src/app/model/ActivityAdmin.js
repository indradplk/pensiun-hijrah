const Sequelize = require('sequelize');
const moment = require('moment-timezone');
const db = require('../config/db.js');

const ActivityAdmin = db.define(
    "log-admin",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nik: { type: Sequelize.STRING },
        log: { type: Sequelize.STRING },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
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

module.exports = ActivityAdmin;
