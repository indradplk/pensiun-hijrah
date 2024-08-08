const Sequelize = require('sequelize');
const moment = require('moment-timezone');
const db = require('../config/db.js');

const Management = db.define(
    "management",{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        nama: { type: Sequelize.STRING },
        jabatan: { type: Sequelize.STRING },
        path_management:{
            type:Sequelize.STRING,
            allowNull: true
        },
        description:{
            type:Sequelize.TEXT,
            allowNull: true
        },
        kategori:{type:Sequelize.STRING},
        status:{
            type:Sequelize.BOOLEAN,
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

module.exports = Management;