var express = require('express');
var router = express.Router();
var agentController = require('../controllers/agentController.js');
var { verifyAgentToken } = require('../middleware/auth')
var { fileUpload } = require('../middleware/fileUpload')
var agentPartnerRoutes = require('./agentPartnerRoutes');
var agentCommissionRoutes = require('./agentCommissionRoutes')
var agentEvaluateRoutes = require('./agentEvaluateRoutes')
var agentPersonalDetailsRoutes = require('./agentPersonalDetailsRoutes')
var agentStudentRoutes = require('./agentStudentRoutes')
router.post('/changePassword',verifyAgentToken,agentController.changePassword)

router.post('/forgotPassword',agentController.forgotPassword)

router.post('/register',agentController.register);

router.post('/login',agentController.login);

router.use('/partner',verifyAgentToken,agentPartnerRoutes);

router.use('/commission',verifyAgentToken,agentCommissionRoutes);

router.use('/evaluate',verifyAgentToken, agentEvaluateRoutes);

router.use('/personalDetails',verifyAgentToken, fileUpload, agentPersonalDetailsRoutes);

router.use('/students',verifyAgentToken,agentStudentRoutes);

module.exports = router;
