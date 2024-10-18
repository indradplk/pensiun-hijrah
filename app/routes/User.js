const { Router } = require('express');
const usersController = require('../controllers/userController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');

const router = Router();

router.get('/', authenticateToken, verifyRole('admin'), usersController.getAll);
router.get('/:username', authenticateToken, verifyRole('admin', 'peserta', 'perusahaan'), usersController.getOne);
router.delete('/:id', authenticateToken, verifyRole('admin'), usersController.delete);

module.exports = router;