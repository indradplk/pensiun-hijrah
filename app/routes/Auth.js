const { Router } = require('express');
const Auth = require('../controllers/auth');

const router = Router();

router.post('/admin/login', Auth.login);
router.post('/peserta/login', Auth.login);
router.post('/perusahaan/login', Auth.login);
router.post('/logout', Auth.logout);

module.exports = router;