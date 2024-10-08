const { Router } = require('express');
const newsController = require('../controllers/newsController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');
const MulterStorage = require('../helpers/multer');
const upload = MulterStorage('berita');

const router = Router();

router.get('/', newsController.getAll);
router.get('/:seo', newsController.getOne);
router.post('/', authenticateToken, verifyRole('admin'), upload.fields([{ name: 'path_news' }]), newsController.create);
router.put('/:id', authenticateToken, verifyRole('admin'), upload.fields([{ name: 'path_news' }]), newsController.update);
router.put('/approve/:id', authenticateToken, verifyRole('admin'), newsController.accept);
router.delete('/:id', authenticateToken, verifyRole('admin'), newsController.delete);

module.exports = router;