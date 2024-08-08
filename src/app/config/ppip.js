const ppip = require('mssql');

const config = {
    user: 'sa',
    password: 'B!sm!ll@h',
    server: '10.55.255.11',
    database: 'dplk_ppip',
    port: 1433,
    options: {
        encrypt: false
    }
};

async function connectToDatabasePPIP() {
    const pool = new ppip.ConnectionPool(config);
    try {
        await pool.connect();
        console.log('Connected to SQL Server database');
        return pool;
    } catch (error) {
        console.error('Error connecting to database:', error);
        throw error;
    }
}

module.exports = { connectToDatabasePPIP };
