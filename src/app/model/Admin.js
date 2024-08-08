const Sequelize = require('sequelize');
const moment = require('moment-timezone');
const db = require('../config/db.js');
const { v4: uuidv4 } = require('uuid');

const Admin = db.define(
    "admin",
    {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        uuid: {
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV4
        },
        nik: { type: Sequelize.STRING },
        email: {
            type: Sequelize.STRING,
            isEmail: true
        },
        nama: { type: Sequelize.STRING },
        password: { type: Sequelize.STRING },
        role: { type: Sequelize.STRING },
        status: {
            type: Sequelize.BOOLEAN,
            defaultValue: true
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

Admin.addHook('beforeValidate', (admin) => {
    if (!admin.uuid) {
        admin.uuid = uuidv4();
    }
})

module.exports = Admin;
