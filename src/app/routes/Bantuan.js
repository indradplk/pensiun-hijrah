const { Router } = require('express')
const route = Router()
const bantuan = require('../controller/BantuanController')
const MulterStorage = require('../service/multer_bantuan')
const upload = MulterStorage('panduan')

route.get('/v1/bantuan', bantuan.index)
route.get('/v1/bantuan/:id', bantuan.show)
route.post('/v1/bantuan', upload.fields([{ name: 'path_bantuan' }]), bantuan.create)
route.put('/v1/bantuan/:id', upload.fields([{ name: 'path_bantuan' }]), bantuan.update)
route.put('/v1/bantuan/accept/:id', bantuan.accept)
route.delete('/v1/bantuan/:id', bantuan.delete)

module.exports = route