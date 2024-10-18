const { Router } = require('express');
const tanyaDPLKController = require('../controllers/tanyaDPLKController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');

const router = Router();

router.get('/', authenticateToken, verifyRole('admin'), tanyaDPLKController.getAll);
router.get('/:id', authenticateToken, verifyRole('admin'), tanyaDPLKController.getOne);
router.put('/:id', authenticateToken, verifyRole('admin'), tanyaDPLKController.update);

module.exports = router;