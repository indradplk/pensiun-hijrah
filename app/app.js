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
app.use(cors());
app.options('*', cors());

app.use('/', Auth);
app.use('/user', User);
app.use('/admin', Admin);
app.use('/peserta', Peserta);
app.use('/perusahaan', Perusahaan);
app.use('/slider', Slider);
app.use('/report', Report);
app.use('/panduan', Panduan);
app.use('/news', News);
app.use('/video', Video);
app.use('/management', Management);
app.use('/award', Award);
app.use('/office', Office);
app.use('/tanya-dplk', TanyaDPLK);
app.use('/mail', Email);
app.use('/log', LogAdmin);
app.use('/ppip', PPIP);
app.use('/ppukp', PPUKP);
app.use('/mdplk', MDPLK);
app.use('/master', Master);
app.use('/wilayah', Region);
app.use('/registrasi', RegistrasiPeserta);
app.use('/registrasi-perusahaan', RegistrasiPerusahaan);
app.use('/parameter', Parameter);
app.use('/hris', AuthHRIS);
app.use('/absen', HRIS);

module.exports = app;