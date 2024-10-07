const ppip = require('mssql');

// Konfigurasi koneksi
const config = {
    user: 'sa',
    password: 'B!sm!ll@h',
    server: '10.55.255.11',
    database: 'templk',
    port: 1433,
    options: {
        encrypt: false
    }
};

async function connectToDatabasePPIP() {
    const pool = new ppip.ConnectionPool(config);
    try {
        await pool.connect();
        console.log('SQL Server (PPIP) Connected!');
        return pool;
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
}

module.exports = { connectToDatabasePPIP };
