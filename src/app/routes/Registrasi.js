const { Router } = require('express')
const route = Router()
const registrasi = require('../controller/RegistrasiController')
const MulterStorage = require('../service/multer_peserta')
const upload = MulterStorage('registrasi')

route.get('/v1/registrasi', registrasi.index)
route.get('/v1/registrasi/:id', registrasi.show)
route.get('/v1/registrasi-perusahaan', registrasi.indexPerusahaan)
route.get('/v1/registrasi-perusahaan/:id', registrasi.showPerusahaan)
route.post('/v1/registrasi', upload.fields([{ name: 'foto_ktp' }, { name: 'foto_kk' }, { name: 'foto_npwp' }]), registrasi.create)
route.put('/v1/registrasi-perusahaan/:id', registrasi.updatePerusahaan)

module.exports = route