const { Router } = require('express');
const panduanController = require('../controllers/panduanController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');
const MulterStorage = require('../helpers/multer');
const upload = MulterStorage('panduan');

const router = Router();

router.get('/', panduanController.getAll);
router.get('/:id', panduanController.getOne);
router.post('/', authenticateToken, verifyRole('admin'), upload.fields([{ name: 'path_panduan' }]), panduanController.create);
router.post('/edit/:id', authenticateToken, verifyRole('admin'), upload.fields([{ name: 'path_panduan' }]), panduanController.update);
router.post('/approve/:id', authenticateToken, verifyRole('admin'), panduanController.accept);
router.post('/delete/:id', authenticateToken, verifyRole('admin'), panduanController.delete);

module.exports = router;