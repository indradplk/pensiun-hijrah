const ppukp = require('mssql');

// Konfigurasi koneksi
const config = {
    user: 'sa',
    password: 'B!sm!ll@h',
    server: '10.55.255.11',
    database: 'dplk07_query',
    port: 1433,
    options: {
        encrypt: false
    }
};

async function connectToDatabasePPUKP() {
    const pool = new ppukp.ConnectionPool(config);
    try {
        await pool.connect();
        console.log('SQL Server (PPUKP) Connected!');
        return pool;
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
}

module.exports = { connectToDatabasePPUKP };
