const mysql = require('mysql');

const mDPLK = mysql.createPool({
    connectionLimit: 10,
    host: '10.55.130.11',
    user: 'root',
    password: 'dplk',
    database: 'db_pendukung',
    connectTimeout: 10000,  // 10 detik
    acquireTimeout: 10000   // 10 detik
});

// Cek koneksi saat inisialisasi pool
mDPLK.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.');
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.');
        }
        if (err.code === 'ETIMEDOUT') {
            console.error('Connection to database timed out.');
        }
        console.error('Error connecting to database:', err);
        return;
    }
    if (connection) connection.release();
    console.log('Connected to MySQL database');
});

module.exports = mDPLK;