var express = require('express');
var router = express.Router();
var agentStudentController = require('../controllers/agentStudentController.js');
var studentController = require('../controllers/studentController')
var {verifyAgentStudentConversion} = require('../middleware/auth')
var studentRoutes = require('./studentRoutes')

/*
 * GET
 */
router.get('/', agentStudentController.list);

/*
 * POST
 */
router.post('/register', agentStudentController.create);

/*
 * PUT
 */
router.use('/:id', verifyAgentStudentConversion,studentRoutes);


module.exports = router;
