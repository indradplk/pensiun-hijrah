const { Router } = require('express');
const pesertaController = require('../controllers/pesertaController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');

const router = Router();

router.post('/register', pesertaController.registrasiPeserta);
router.post('/:username', authenticateToken, verifyRole('peserta'), pesertaController.editPeserta);
router.post('/unblock/:no_peserta', authenticateToken, verifyRole('admin'), pesertaController.unblockAccount)

module.exports = router;