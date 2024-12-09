const { Router } = require('express');
const managementController = require('../controllers/managementController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');
const MulterStorage = require('../helpers/multer');
const upload = MulterStorage('manajemen');

const router = Router();

router.get('/', managementController.getAll);
router.get('/:id', managementController.getOne);
router.post('/', authenticateToken, verifyRole('admin'), upload.fields([{ name: 'path_management' }]), managementController.create);
router.post('/edit/:id', authenticateToken, verifyRole('admin'), upload.fields([{ name: 'path_management' }]), managementController.update);
router.post('/approve/:id', authenticateToken, verifyRole('admin'), managementController.accept);
router.post('/delete/:id', authenticateToken, verifyRole('admin'), managementController.delete);

module.exports = router;