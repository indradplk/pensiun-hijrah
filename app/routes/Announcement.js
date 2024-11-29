const { Router } = require('express');
const announcementController = require('../controllers/announcementController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');
const MulterStorage = require('../helpers/multer');
const upload = MulterStorage('pengumuman');

const router = Router();

router.get('/', announcementController.getAll);
router.get('/:seo', announcementController.getOne);
router.post('/', authenticateToken, verifyRole('admin'), upload.fields([{ name: 'path_announcement' }, { name: 'document' }]), announcementController.create);
router.put('/:id', authenticateToken, verifyRole('admin'), upload.fields([{ name: 'path_announcement' }, { name: 'document' }]), announcementController.update);
router.put('/approve/:id', authenticateToken, verifyRole('admin'), announcementController.accept);
router.delete('/:id', authenticateToken, verifyRole('admin'), announcementController.delete);

module.exports = router;