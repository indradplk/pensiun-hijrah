const { Router } = require('express')
const route = Router()
const admin = require('../controller/AdminController')

route.get('/v1/admin', admin.index)
route.get('/v1/admin/:nik', admin.show)
route.put('/v1/admin/:uuid', admin.edit)
route.delete('/v1/admin/:uuid', admin.delete)
route.post('/v1/admin/register', admin.register)
route.post('/v1/admin/auth', admin.auth)
route.post('/v1/admin/login', admin.login)
route.post('/v1/admin/logout', admin.logout)
route.post('/v1/admin/reset-password/:nik', admin.resetPassword)

module.exports = route