const Sequelize = require('sequelize');
const moment = require('moment-timezone');
const db = require('../config/db.js');
const { v4: uuidv4 } = require('uuid');

const News = db.define(
    "news",{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        title: { type: Sequelize.STRING },
        seo: { type: Sequelize.STRING },
        path_news:{
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

module.exports = News;