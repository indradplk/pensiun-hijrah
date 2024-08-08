const { Router } = require('express')
const route = Router()
const ppip = require('../../controller/T2KR/PPIPController')
// const ppip = require('../../controller/Dummy/PPIPDummyController')

route.get('/v1/ppip/list/:kode_korporat', ppip.index)
route.get('/v1/ppip/peserta/:noPeserta', ppip.show)
route.get('/v1/ppip/saldo/:noPeserta', ppip.balance)
route.get('/v1/ppip/transaksi/:noPeserta', ppip.transaction)
route.get('/v1/ppip/parameter/:key_parameter', ppip.parameter)
route.get('/v1/ppip/pindah-paket/:noPeserta', ppip.lastPackage)
route.get('/v1/ppip/usia-pensiun/:noPeserta', ppip.usiaPensiun)
route.put('/v1/ppip/usia-pensiun/:noPeserta', ppip.updateUsiaPensiun)
route.post('/v1/ppip/life-cycle-fund/:noPeserta', ppip.lifeCycleFund)
route.post('/v1/ppip/registrasi', ppip.registrasi)
route.put('/v1/ppip/parameter/:key_parameter', ppip.updateParameter)

module.exports = route