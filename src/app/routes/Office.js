const { Router } = require('express')
const route = Router()
const office = require('../controller/OfficeController')

route.get('/v1/office', office.index)
route.get('/v1/office/:id', office.show)
route.put('/v1/office/:id', office.edit)
route.delete('/v1/office/:id', office.delete)
route.put('/v1/office/accept/:id', office.accept)
route.post('/v1/office', office.create)

module.exports = route