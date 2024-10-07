const { Router } = require('express');
const ppukpController = require('../../controllers/core/ppukpController');
const { authenticateToken } = require('../../helpers/jwt');
const { verifyRole } = require('../../helpers/roleVerification');

const router = Router();

router.get('/perusahaan/:noPeserta', authenticateToken, verifyRole('perusahaan'), ppukpController.getOne);
router.get('/saldo/:noPeserta', authenticateToken, verifyRole('perusahaan'), ppukpController.getBalance);
router.get('/transaksi/:noPeserta', authenticateToken, verifyRole('perusahaan'), ppukpController.getTransaction);

module.exports = router;