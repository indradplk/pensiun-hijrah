require('dotenv').config();
const bcrypt = require('bcryptjs');
const { db } = require('./config/db');
const User = require('./models/User');
const Admin = require('./models/Admin');

// Fungsi untuk meng-hash password
async function hashPassword(data) {
  return await bcrypt.hash(data, 10);
}

(async () => {
  try {
    // Hash password sebelum memasukkan user default
    const hashedPassword = await hashPassword('password123');

    const defaultUsers = [
      { username: 'admindplk', password: hashedPassword, role: 'admin', adminId: '1' },
    ];

    const defaultAdmins = [
      { name: 'Admin DPLK', email: 'dplk@bankmuamalat.co.id', role: 'administrator' },
    ];

    async function autoFeeder() {
      try {
        // Koneksi ke database
        await db.authenticate();
        console.log('Database connected.');

        // Sinkronisasi model dengan database
        await db.sync({ alter: true });
        console.log('Database synchronized.');

        // Menambahkan data default ke tabel Admin
        for (const admin of defaultAdmins) {
          const [existingAdmin] = await Admin.findOrCreate({
            where: { email: admin.email },
            defaults: admin
          });

          console.log(`Admin ${admin.email} already exists or created.`);
        }

        // Menambahkan data default ke tabel User
        for (const user of defaultUsers) {
          // Cari admin yang sesuai
          const admin = await Admin.findOne({ where: { id: user.adminId } });

          if (!admin) {
            console.log(`Admin with ID ${user.adminId} not found.`);
            continue; // skip user creation if admin doesn't exist
          }

          // Periksa apakah user sudah ada
          const [existingUser] = await User.findOrCreate({
            where: { username: user.username },
            defaults: user
          });

          if (existingUser) {
            console.log(`User ${user.username} already exists or created.`);
          } else {
            console.log(`User ${user.username} created.`);
          }
        }
      } catch (err) {
        console.error('Error in autoFeeder:', err.message);
      }
    }

    // Jalankan auto feeder
    await autoFeeder();
  } catch (err) {
    console.error('Error:', err.message);
  }
})();
