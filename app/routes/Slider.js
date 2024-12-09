const { Router } = require('express');
const sliderController = require('../controllers/sliderController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');
const MulterStorage = require('../helpers/multer');
const upload = MulterStorage('slider');

const router = Router();

router.get('/', sliderController.getAll);
router.get('/:id', sliderController.getOne);
router.post('/', authenticateToken, verifyRole('admin'), upload.fields([{ name: 'path_web' }, { name: 'path_mobile' }]), sliderController.create);
router.post('/edit/:id', authenticateToken, verifyRole('admin'), upload.fields([{ name: 'path_web' }, { name: 'path_mobile' }]), sliderController.update);
router.post('/approve/:id', authenticateToken, verifyRole('admin'), sliderController.accept);
router.post('/delete/:id', authenticateToken, verifyRole('admin'), sliderController.delete);

module.exports = router;