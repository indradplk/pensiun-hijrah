const { Router } = require('express');
const registrasiPerusahaanController = require('../controllers/registrasiPerusahaanController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');

const router = Router();

router.get('/', authenticateToken, verifyRole('admin'), registrasiPerusahaanController.getAll);
router.get('/:id', authenticateToken, verifyRole('admin'), registrasiPerusahaanController.getOne);

module.exports = router;