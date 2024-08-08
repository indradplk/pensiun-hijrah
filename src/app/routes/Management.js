const { Router } = require('express')
const route = Router()
const management = require('../controller/ManagementController')
const MulterStorage = require('../service/multer_about')
const upload = MulterStorage('manajemen')

route.get('/v1/management', management.index)
route.get('/v1/management/:id', management.show)
route.post('/v1/management', upload.fields([{ name: 'path_management' }]), management.create)
route.put('/v1/management/:id', upload.fields([{ name: 'path_management' }]), management.update)
route.put('/v1/management/accept/:id', management.accept)
route.delete('/v1/management/:id', management.delete)

module.exports = route