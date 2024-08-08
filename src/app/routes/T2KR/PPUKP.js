const { Router } = require('express')
const route = Router()
const ppukp = require('../../controller/T2KR/PPUKPController')
// const ppukp = require('../../controller/Dummy/PPIPDummyController')

route.get('/v1/ppukp/list/:kode_korporat', ppukp.index)
route.get('/v1/ppukp/peserta/:noPeserta', ppukp.show)
route.get('/v1/ppukp/saldo/:noPeserta', ppukp.balance)
route.get('/v1/ppukp/transaksi/:noPeserta', ppukp.transaction)

module.exports = route