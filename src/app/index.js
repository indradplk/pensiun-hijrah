const express = require('express');
const app = express();
const db = require('./config/db');
// const { connectToDatabasePPIP } = require('./config/ppip');
const { connectToDatabasePPIP } = require('./config/templk');
// const { connectToDatabasePPUKP } = require('./config/ppukp');
const { connectToDatabasePPUKP } = require('./config/dplk07_query');
const mdplk = require('./config/mdplk');
const session = require("express-session");
const cors = require('cors');
const moment = require('moment-timezone');

// Set zona waktu default ke Asia/Jakarta
moment.tz.setDefault('Asia/Jakarta');

const admin = require('./routes/Admin');
const log_admin = require('./routes/LogAdmin');
const user_ppip = require('./routes/Peserta');
const user_ppukp = require('./routes/Perusahaan');
const slider = require('./routes/Slider');
const office = require('./routes/Office');
const award = require('./routes/Award');
const management = require('./routes/Management');
const news = require('./routes/News');
const video = require('./routes/Video');
const report = require('./routes/Report');
const bantuan = require('./routes/Bantuan');
const mail = require('./routes/Email');
const region = require('./routes/Region');
const master = require('./routes/Master');
const registrasi = require('./routes/Registrasi');
const peserta = require('./routes/T2KR/PPIP');
const corporate = require('./routes/T2KR/PPUKP');
const pendukung = require('./routes/MDPLK/Pendukung');
const tanyaDPLK = require('./routes/TanyaDPLK');

const {
    PORT = 4000,
    NODE_ENV = 'development',
    SESS_SECRET = 'this is pensiun hijrah app secret key',
    SESS_ADMIN_NAME = 'admin_sid',
    SESS_USER_NAME = 'user_sid',
    SESS_LIFETIME = 1000*60*60*1, // 1 jam
    SERVER_NAME = 'http://10.81.61.11'
} = process.env;

db.authenticate().then(() => console.log("successfully connected to database"));

async function queryDatabasePPIP() {
    const pool = await connectToDatabasePPIP();
    try {
        await pool.connect();
        console.log('Connected to SQL Server database');
    } catch (error) {
        console.error('Error querying database:', error);
    }
}

async function queryDatabasePPUKP() {
    const pool = await connectToDatabasePPUKP();
    try {
        await pool.connect();
        console.log('Connected to SQL Server database');
    } catch (error) {
        console.error('Error querying database:', error);
    }
}

mdplk.getConnection((err, connection) => {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
    connection.release();
});

queryDatabasePPIP();
queryDatabasePPUKP();

// Initialize session configurations
const adminSessionConfig = {
    name: SESS_ADMIN_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: NODE_ENV === 'production',
    },
};

const userSessionConfig = {
    name: SESS_USER_NAME,
    resave: false,
    saveUninitialized: false,
    secret: SESS_SECRET,
    cookie: {
        maxAge: SESS_LIFETIME,
        sameSite: true,
        secure: NODE_ENV === 'production',
    },
};

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({
    origin: [`${SERVER_NAME}:4000`, `${SERVER_NAME}:3000`, "http://localhost:4000", "http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials:true
}));
app.use(session(adminSessionConfig));
app.use(session(userSessionConfig));

app.use(admin);
app.use(log_admin);
app.use(user_ppip);
app.use(user_ppukp);
app.use(slider);
app.use(office);
app.use(award);
app.use(management);
app.use(news);
app.use(video);
app.use(report);
app.use(bantuan);
app.use(mail);
app.use(region);
app.use(master);
app.use(registrasi);
app.use(peserta);
app.use(corporate);
app.use(pendukung);
app.use(tanyaDPLK);

app.listen(PORT, () => console.log(`Server is running at ${SERVER_NAME}:${PORT}`))