var express = require('express');
var router = express.Router();
var agentEvaluateController = require('../controllers/agentEvaluateController.js');

/*
 * GET
 */
router.get('/', agentEvaluateController.show);



/*
 * PUT
 */
router.put('/', agentEvaluateController.update);


module.exports = router;
