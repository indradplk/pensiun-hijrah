const { DataTypes } = require('sequelize');
const { db } = require('../config/db');

const Admin = db.define('Admin', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('administrator', 'supervisor', 'operator'),
    allowNull: false
  },
  userUpdate: {
    type: DataTypes.STRING,
    defaultValue: 'SYSTEM'
  }
}, {
  tableName: 'admin',
  timestamps: true
});

module.exports = Admin;
