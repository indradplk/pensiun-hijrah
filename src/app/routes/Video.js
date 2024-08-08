const { Router } = require('express')
const route = Router()
const video = require('../controller/VideoController')

route.get('/v1/video', video.index)
route.get('/v1/video/:id', video.show)
route.put('/v1/video/:id', video.edit)
route.delete('/v1/video/:id', video.delete)
route.put('/v1/video/accept/:id', video.accept)
route.post('/v1/video', video.create)

module.exports = route