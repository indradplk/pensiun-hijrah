const { Router } = require('express');
const parameterController = require('../controllers/parameterController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');

const router = Router();

router.get('/', parameterController.getAll);
router.get('/:KEY_PARAMETER', parameterController.getOne);
router.post('/:id', authenticateToken, verifyRole('admin'), parameterController.update);

module.exports = router;