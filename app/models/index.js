const User = require('./User');
const Admin = require('./Admin');
const Slider = require('./Slider');

// Definisikan relasi antar model
User.belongsTo(Admin, { foreignKey: 'adminId' });

Admin.hasMany(User, { foreignKey: 'adminId' });

module.exports = { User, Admin, Slider };
