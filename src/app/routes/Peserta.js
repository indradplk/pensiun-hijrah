const { Router } = require('express')
const route = Router()
const peserta = require('../controller/PesertaController')
// const peserta = require('../controller/Dummy/PesertaDummyController')

route.get('/v1/peserta', peserta.index)
route.get('/v1/peserta/:no_peserta', peserta.show)
route.put('/v1/peserta/:no_peserta', peserta.edit)
route.post('/v1/peserta/register', peserta.register)
route.post('/v1/peserta/auth', peserta.auth)
route.post('/v1/peserta/login', peserta.login)
route.post('/v1/peserta/logout', peserta.logout)
route.post('/v1/peserta/unblock/:no_peserta', peserta.unblockAccount)
route.post('/v1/peserta/reset-password/:no_peserta', peserta.resetPassword)

module.exports = route