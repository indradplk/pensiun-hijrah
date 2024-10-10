const { Router } = require('express');
const hrisController = require('../../controllers/hris/hrisController');
const { authenticateToken } = require('../../helpers/jwt');
const { verifyRoleHRIS } = require('../../helpers/roleVerification');

const router = Router();

router.get('/:nik', authenticateToken, verifyRoleHRIS('Staff', 'Supervisor', 'Manager'), hrisController.show)
router.post('/clock-in', authenticateToken, verifyRoleHRIS('Staff', 'Supervisor', 'Manager'), hrisController.clockInWithLocation);
router.post('/visit/clock-in', authenticateToken, verifyRoleHRIS('Staff', 'Supervisor', 'Manager'), hrisController.clockInVisit);
router.post('/clock-out', authenticateToken, verifyRoleHRIS('Staff', 'Supervisor', 'Manager'), hrisController.clockOutWithLocation);

module.exports = router;