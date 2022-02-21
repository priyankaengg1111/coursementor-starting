var express = require('express');
var router = express.Router();
var agentPartnerController = require('../controllers/agentPartnerController.js');

/*
 * GET
 */
router.get('/', agentPartnerController.list);

/*
 * GET
 */
router.get('/:id', agentPartnerController.show);

/*
 * POST
 */
router.post('/', agentPartnerController.create);

/*
 * PUT
 */
router.put('/:id', agentPartnerController.update);

/*
 * DELETE
 */
router.delete('/:id', agentPartnerController.remove);

module.exports = router;
