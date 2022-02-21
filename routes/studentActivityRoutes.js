var express = require('express');
var router = express.Router();
var studentActivityController = require('../controllers/studentActivityController.js');

/*
 * GET
 */
router.get('/', studentActivityController.list);

/*
 * GET
 */
router.get('/:id', studentActivityController.show);

/*
 * POST
 */
router.post('/', studentActivityController.create);

/*
 * PUT
 */
router.put('/:id', studentActivityController.update);

/*
 * DELETE
 */
router.delete('/:id', studentActivityController.remove);

module.exports = router;
