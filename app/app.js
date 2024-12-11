const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');

const Auth = require('./routes/Auth');
const User = require('./routes/User');
const Admin = require('./routes/Admin');
const Peserta = require('./routes/Peserta');
const Perusahaan = require('./routes/Perusahaan');
const Slider = require('./routes/Slider');
const Report = require('./routes/Report');
const Panduan = require('./routes/Panduan');
const News = require('./routes/News');
const Announcement = require('./routes/Announcement');
const Video = require('./routes/Video');
const Management = require('./routes/Management');
const Award = require('./routes/Award');
const Office = require('./routes/Office');
const TanyaDPLK = require('./routes/TanyaDPLK');
const Email = require('./routes/Email');
const LogAdmin = require('./routes/LogAdmin');
const Master = require('./routes/Master');
const Region = require('./routes/Region');
const Parameter = require('./routes/Parameter');

const PPIP = require('./routes/core/PPIP');
const PPUKP = require('./routes/core/PPUKP');
const MDPLK = require('./routes/support/MDPLK');
const RegistrasiPeserta = require('./routes/RegistrasiPeserta');
const RegistrasiPerusahaan = require('./routes/RegistrasiPerusahaan');

const AuthHRIS = require('./routes/hris/Auth');
const HRIS = require('./routes/hris/HRIS');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(helmet());
app.use(compression());
app.use(
  morgan(':method :url :status :res[content-length] - :response-time ms')
);
app.use(cors({
  origin: process.env.API_BASE_URL,
  credentials: true,
}));
app.options('*', cors({
  origin: process.env.API_BASE_URL,
  credentials: true,
}));

app.use('/api/v1/', Auth);
app.use('/api/v1/user', User);
app.use('/api/v1/admin', Admin);
app.use('/api/v1/peserta', Peserta);
app.use('/api/v1/perusahaan', Perusahaan);
app.use('/api/v1/slider', Slider);
app.use('/api/v1/report', Report);
app.use('/api/v1/panduan', Panduan);
app.use('/api/v1/news', News);
app.use('/api/v1/announcement', Announcement);
app.use('/api/v1/video', Video);
app.use('/api/v1/management', Management);
app.use('/api/v1/award', Award);
app.use('/api/v1/office', Office);
app.use('/api/v1/tanya-dplk', TanyaDPLK);
app.use('/api/v1/mail', Email);
app.use('/api/v1/log', LogAdmin);
app.use('/api/v1/ppip', PPIP);
app.use('/api/v1/ppukp', PPUKP);
app.use('/api/v1/mdplk', MDPLK);
app.use('/api/v1/master', Master);
app.use('/api/v1/wilayah', Region);
app.use('/api/v1/registrasi', RegistrasiPeserta);
app.use('/api/v1/registrasi-perusahaan', RegistrasiPerusahaan);
app.use('/api/v1/parameter', Parameter);
app.use('/api/v1/hris', AuthHRIS);
app.use('/api/v1/absen', HRIS);

module.exports = app;