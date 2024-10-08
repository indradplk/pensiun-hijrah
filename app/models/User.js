const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const { db } = require('../config/db');

const User = db.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('admin', 'peserta', 'perusahaan'),
    allowNull: false
  },
  block_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
 },
  adminId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    references: {
      model: 'admin',
      key: 'id'
    }
  },
  pesertaEmail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  perusahaanEmail: {
    type: DataTypes.STRING,
    allowNull: true
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  userUpdate: {
    type: DataTypes.STRING,
    defaultValue: 'SYSTEM'
  }
}, {
  tableName: 'user',
  timestamps: true
});

module.exports = User;
