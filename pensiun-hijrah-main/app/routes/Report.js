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
router.put('/:id', authenticateToken, verifyRole('admin'), upload.fields([{ name: 'path_report' }]), reportController.update);
router.put('/approve/:id', authenticateToken, verifyRole('admin'), reportController.accept);
router.delete('/:id', authenticateToken, verifyRole('admin'), reportController.delete);

module.exports = router;