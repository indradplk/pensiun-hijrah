const { Router } = require('express');
const perusahaanController = require('../controllers/perusahaanController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');

const router = Router();

router.post('/register', perusahaanController.registrasiPerusahaan);
router.put('/:username', authenticateToken, verifyRole('perusahaan'), perusahaanController.editPeserta);
router.post('/unblock/:no_peserta', authenticateToken, verifyRole('admin'), perusahaanController.unblockAccount)

module.exports = router;