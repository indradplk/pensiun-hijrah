const { Router } = require('express');
const registrasiPesertaController = require('../controllers/registrasiPesertaController');
const { authenticateToken } = require('../helpers/jwt');
const { verifyRole } = require('../helpers/roleVerification');
const MulterStorage = require('../helpers/multer');
const upload = MulterStorage('registrasi-peserta');

const router = Router();

router.get('/', authenticateToken, verifyRole('admin'), registrasiPesertaController.getAll);
router.get('/:id', authenticateToken, verifyRole('admin'), registrasiPesertaController.getOne);
router.post('/', upload.fields([{ name: 'foto_ktp' }, { name: 'foto_kk' }, { name: 'foto_npwp' }]), registrasiPesertaController.create);

module.exports = router;