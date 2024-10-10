const { Router } = require('express');
const Auth = require('../../controllers/hris/auth');

const router = Router();

router.post('/login', Auth.login);
router.post('/logout', Auth.logout);

module.exports = router;