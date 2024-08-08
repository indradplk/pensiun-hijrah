const Sequelize = require('sequelize');
const moment = require('moment-timezone');
const db = require('../config/db.js');

const Office = db.define(
    "office",{
        id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        kode_cabang:{type:Sequelize.INTEGER},
        nama:{type:Sequelize.STRING},
        cabang:{type:Sequelize.STRING},
        area:{type:Sequelize.STRING},
        alamat:{type:Sequelize.STRING},
        telepon:{type:Sequelize.STRING},
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

module.exports = Office;