var express = require('express');
var router = express.Router();
var agentPersonalDetailsController = require('../controllers/agentPersonalDetailsController.js');

/*
 * GET
 */
router.get('/', agentPersonalDetailsController.show);

/*
 * PUT
 */
router.put('/', agentPersonalDetailsController.update);


module.exports = router;
