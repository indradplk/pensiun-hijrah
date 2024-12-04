const { Router } = require('express');
const mdplkController = require('../../controllers/support/mdplkController');
const { authenticateToken } = require('../../helpers/jwt');
const { verifyRole } = require('../../helpers/roleVerification');
const MulterStorage = require('../../helpers/multer');
const upload = MulterStorage('pengkinian-data');

const router = Router();

router.get('/klaim/:no_peserta', authenticateToken, verifyRole('peserta'), mdplkController.getKlaim);
router.get('/pengkinian-data/:no_peserta', authenticateToken, verifyRole('peserta'), mdplkController.getPengkinianData);
router.get('/life-cycle-fund/:no_peserta', authenticateToken, verifyRole('peserta'), mdplkController.getLCF);
router.get('/paket-investasi/:no_peserta', authenticateToken, verifyRole('peserta'), mdplkController.lastPackage);
router.get('/ubah-paket-investasi', authenticateToken, verifyRole('admin'), mdplkController.getPaketInvestasi);
router.get('/pengkinian-data', authenticateToken, verifyRole('admin'), mdplkController.getPengkinianDataPeserta);
router.post('/pengkinian-data/:no_peserta', authenticateToken, verifyRole('peserta'), upload.single('gambar_ktp'), mdplkController.pengkinianData);
router.post('/usia-pensiun/:no_peserta', authenticateToken, verifyRole('peserta'),  mdplkController.ubahUsia);
router.post('/paket-investasi/:no_peserta', authenticateToken, verifyRole('peserta'),  mdplkController.ubahPaket);
router.post('/life-cycle-fund/:no_peserta', authenticateToken, verifyRole('peserta'),  mdplkController.lifeCycleFund);
router.post('/approve/paket-investasi/:no_peserta', authenticateToken, verifyRole('admin'),  mdplkController.approvePaket);

module.exports = router;