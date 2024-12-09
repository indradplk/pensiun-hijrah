const { Router } = require('express');
const reportController = require('../controllers/reportController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');
const MulterStorage = require('../helpers/multer');
const upload = MulterStorage('report');

const router = Router();

router.get('/', reportController.getAll);
router.get('/:id', reportController.getOne);
router.post('/', authenticateToken, verifyRole('admin'), upload.fields([{ name: 'path_report' }]), reportController.create);
router.post('/edit/:id', authenticateToken, verifyRole('admin'), upload.fields([{ name: 'path_report' }]), reportController.update);
router.post('/approve/:id', authenticateToken, verifyRole('admin'), reportController.accept);
router.post('/delete/:id', authenticateToken, verifyRole('admin'), reportController.delete);

module.exports = router;