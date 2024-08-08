const { Router } = require('express')
const route = Router()
const mdplk = require('../../controller/MDPLK/PendukungController')
// const mdplk = require('../../controller/Dummy/PendukungDummyController')
const MulterStorage = require('../../service/multer')
const upload = MulterStorage('pengkinian-data')

route.get('/v1/mdplk/klaim/:no_peserta', mdplk.getKlaim)
route.get('/v1/mdplk/pengkinian-data/:no_peserta', mdplk.getPengkinianData)
route.post('/v1/mdplk/pengkinian-data', upload.single('gambar_ktp'), mdplk.pengkinianData)
route.post('/v1/mdplk/paket-investasi', mdplk.ubahPaket)
route.post('/v1/mdplk/usia-pensiun', mdplk.ubahUsia)
route.get('/v1/mdplk/life-cycle-fund/:no_peserta', mdplk.getLCF)
route.post('/v1/mdplk/life-cycle-fund', mdplk.lifeCycleFund)

module.exports = route