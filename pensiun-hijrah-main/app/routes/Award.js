const { Router } = require('express');
const awardController = require('../controllers/awardController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');
const MulterStorage = require('../helpers/multer');
const upload = MulterStorage('penghargaan');

const router = Router();

router.get('/', awardController.getAll);
router.get('/:id', awardController.getOne);
router.post('/', authenticateToken, verifyRole('admin'), upload.fields([{ name: 'path_award' }]), awardController.create);
router.put('/:id', authenticateToken, verifyRole('admin'), upload.fields([{ name: 'path_award' }]), awardController.update);
router.put('/approve/:id', authenticateToken, verifyRole('admin'), awardController.accept);
router.delete('/:id', authenticateToken, verifyRole('admin'), awardController.delete);

module.exports = router;