const { Router } = require('express')
const route = Router()
const tanyaDPLK = require('../controller/TanyaDPLKController')

route.get('/v1/tanya-dplk', tanyaDPLK.index)
route.get('/v1/tanya-dplk/:id', tanyaDPLK.show)
route.put('/v1/tanya-dplk/:id', tanyaDPLK.update)

module.exports = route