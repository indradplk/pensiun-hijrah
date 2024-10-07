const { Router } = require('express');
const adminsController = require('../controllers/adminController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');

const router = Router();

router.get('/:id', authenticateToken, verifyRole('admin'), adminsController.getOne);
router.post('/register', authenticateToken, verifyRole('admin'), adminsController.addAdmin);
router.put('/:username', authenticateToken, verifyRole('admin'), adminsController.editAdmin);
router.post('/reset-password/:username', authenticateToken, verifyRole('admin'), adminsController.unblockAccount);

module.exports = router;