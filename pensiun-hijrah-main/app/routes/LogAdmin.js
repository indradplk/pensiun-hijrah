const { Router } = require('express');
const logAdminController = require('../controllers/logAdminController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');

const router = Router();

router.get('/admin', authenticateToken, verifyRole('admin'), logAdminController.getAll);

module.exports = router;