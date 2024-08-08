const { Router } = require('express')
const route = Router()
const perusahaan = require('../controller/PerusahaanController')

route.get('/v1/perusahaan', perusahaan.index)
route.get('/v1/perusahaan/:no_peserta', perusahaan.show)
route.put('/v1/perusahaan/:no_peserta', perusahaan.edit)
route.post('/v1/perusahaan/register', perusahaan.register)
route.post('/v1/perusahaan/auth', perusahaan.auth)
route.post('/v1/perusahaan/login', perusahaan.login)
route.post('/v1/perusahaan/logout', perusahaan.logout)
route.post('/v1/perusahaan/unblock/:no_peserta', perusahaan.unblockAccount)
route.post('/v1/perusahaan/reset-password/:no_peserta', perusahaan.resetPassword)

module.exports = route