const { Router } = require('express')
const route = Router()
const news = require('../controller/NewsController')
const MulterStorage = require('../service/multer_media')
const upload = MulterStorage('berita')

route.get('/v1/news', news.index)
route.get('/v1/news/:seo', news.show)
route.post('/v1/news', upload.fields([{ name: 'path_news' }]), news.create)
route.put('/v1/news/:id', upload.fields([{ name: 'path_news' }]), news.update)
route.put('/v1/news/accept/:id', news.accept)
route.delete('/v1/news/:seo', news.delete)

module.exports = route