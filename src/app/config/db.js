const Sequelize = require('sequelize');
const db = new Sequelize('dplk_db', 'root', 'Bismillah123!', {
    dialect: 'mysql',
    timezone: '+07:00'
});

db.sync({});

module.exports = db;
