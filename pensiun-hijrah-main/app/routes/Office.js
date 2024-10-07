const { Router } = require('express');
const officeController = require('../controllers/officeController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');

const router = Router();

router.get('/', officeController.getAll);
router.get('/:id', officeController.getOne);

module.exports = router;