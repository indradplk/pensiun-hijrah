const { Router } = require('express')
const route = Router()
const log = require('../controller/LogAdminController')

route.get('/v1/log/admin', log.index)

module.exports = route