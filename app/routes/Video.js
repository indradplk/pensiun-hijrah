const { Router } = require('express');
const videoController = require('../controllers/videoController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');

const router = Router();

router.get('/', videoController.getAll);
router.get('/:id', videoController.getOne);
router.post('/', authenticateToken, verifyRole('admin'), videoController.create);
router.post('/edit/:id', authenticateToken, verifyRole('admin'), videoController.update);
router.post('/approve/:id', authenticateToken, verifyRole('admin'), videoController.accept);
router.post('/delete/:id', authenticateToken, verifyRole('admin'), videoController.delete);

module.exports = router;