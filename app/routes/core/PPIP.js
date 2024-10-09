const { Router } = require('express');
const ppipController = require('../../controllers/core/ppipController');
const { authenticateToken } = require('../../helpers/jwt');
const { verifyRole } = require('../../helpers/roleVerification');

const router = Router();

router.get('/peserta/:noPeserta', authenticateToken, verifyRole('peserta'), ppipController.getOne);
router.get('/saldo/:noPeserta', authenticateToken, verifyRole('peserta'), ppipController.getBalance);
router.get('/transaksi/:noPeserta', authenticateToken, verifyRole('peserta'), ppipController.getTransaction);
router.get('/pindah-paket/:noPeserta', authenticateToken, verifyRole('peserta'), ppipController.lastPackage);
router.get('/usia-pensiun/:noPeserta', authenticateToken, verifyRole('peserta'), ppipController.retirementAge);
router.get('/parameter/:key_parameter', ppipController.getParameter);
router.post('/usia-pensiun/:noPeserta', authenticateToken, verifyRole('peserta'), ppipController.updateRetirementAge);
router.post('/life-cycle-fund/:noPeserta', authenticateToken, verifyRole('peserta'), ppipController.lifeCycleFund);
router.post('/paket-investasi/:noPeserta', authenticateToken, verifyRole('admin'), ppipController.paketInvestasi);
router.post('/registrasi', ppipController.registrasi);

module.exports = router;