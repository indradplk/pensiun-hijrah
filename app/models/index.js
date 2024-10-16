const User = require('./User');
const Admin = require('./Admin');

// Definisikan relasi antar model
User.belongsTo(Admin, { foreignKey: 'adminId' });

Admin.hasMany(User, { foreignKey: 'adminId' });

module.exports = { User, Admin };
