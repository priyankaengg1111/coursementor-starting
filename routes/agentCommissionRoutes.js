var express = require('express');
var router = express.Router();
var agentCommissionController = require('../controllers/agentCommissionController.js');

/*
 * GET
 */
router.get('/', agentCommissionController.list);

/*
 * GET
 */
router.get('/:id', agentCommissionController.show);

/*
 * POST
 */
router.post('/', agentCommissionController.create);

/*
 * PUT
 */
router.put('/:id', agentCommissionController.update);

/*
 * DELETE
 */
router.delete('/:id', agentCommissionController.remove);

module.exports = router;
