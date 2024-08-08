const { Router } = require('express')
const route = Router()
const report = require('../controller/ReportController')
const MulterStorage = require('../service/multer_media')
const upload = MulterStorage('laporan')

route.get('/v1/report', report.index)
route.get('/v1/report/:id', report.show)
route.post('/v1/report', upload.fields([{ name: 'path_report' }]), report.create)
route.put('/v1/report/:id', upload.fields([{ name: 'path_report' }]), report.update)
route.put('/v1/report/accept/:id', report.accept)
route.delete('/v1/report/:id', report.delete)

module.exports = route