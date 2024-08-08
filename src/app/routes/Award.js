const { Router } = require('express')
const route = Router()
const award = require('../controller/AwardController')
const MulterStorage = require('../service/multer_about')
const upload = MulterStorage('penghargaan')

route.get('/v1/award', award.index)
route.get('/v1/award/:id', award.show)
route.post('/v1/award', upload.fields([{ name: 'path_award' }]), award.create)
route.put('/v1/award/:id', upload.fields([{ name: 'path_award' }]), award.update)
route.put('/v1/award/accept/:id', award.accept)
route.delete('/v1/award/:id', award.delete)

module.exports = route