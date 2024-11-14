const mysql = require('mysql2/promise');

// Konfigurasi koneksi
const config = {
    user: 'root',
    password: 'dplk',
    host: '10.55.130.11',
    database: 'hc_dplk'
};

async function connectToDatabaseHRIS() {
    try {
        const pool = mysql.createPool(config);
        console.log('MySQL (HRIS) Connected!');
        return pool;
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
}

module.exports = { connectToDatabaseHRIS };