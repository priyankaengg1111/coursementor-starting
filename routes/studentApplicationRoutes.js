var express = require('express');
var router = express.Router();
var studentApplicationController = require('../controllers/studentApplicationController.js');

/*
 * GET
 */
router.get('/', studentApplicationController.list);

/*
 * GET
 */
router.get('/:id', studentApplicationController.show);

/*
 * POST
 */
router.post('/', studentApplicationController.create);

/*
 * PUT
 */
router.put('/:id', studentApplicationController.update);

/*
 * DELETE
 */
router.delete('/:id', studentApplicationController.remove);

module.exports = router;
