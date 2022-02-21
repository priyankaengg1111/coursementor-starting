var express = require('express');
var router = express.Router();
var universitySummaryController = require('../controllers/universitySummaryController.js');

/*
 * GET
 */
router.get('/', universitySummaryController.list);

/*
 * GET
 */
router.get('/:id', universitySummaryController.show);

/*
 * POST
 */
router.post('/', universitySummaryController.create);

/*
 * PUT
 */
router.put('/:id', universitySummaryController.update);

/*
 * DELETE
 */
router.delete('/:id', universitySummaryController.remove);

module.exports = router;
