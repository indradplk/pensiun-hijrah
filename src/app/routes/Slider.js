const { Router } = require('express')
const route = Router()
const slider = require('../controller/SliderController')
const MulterStorage = require('../service/multer')
const upload = MulterStorage('slider')

route.get('/v1/slider', slider.index)
route.get('/v1/slider/:id', slider.show)
route.post('/v1/slider', upload.fields([{ name: 'path_web' }, { name: 'path_mobile' }]), slider.create)
route.put('/v1/slider/:id', upload.fields([{ name: 'path_web' }, { name: 'path_mobile' }]), slider.update)
route.put('/v1/slider/accept/:id', slider.accept)
route.delete('/v1/slider/:id', slider.delete)

module.exports = route