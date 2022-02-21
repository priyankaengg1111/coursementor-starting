var express = require('express');
var router = express.Router();
var universityOverviewController = require('../controllers/universityOverviewController.js');

/*
 * GET
 */
router.get('/', universityOverviewController.list);

/*
 * GET
 */
router.get('/:id', universityOverviewController.show);

/*
 * POST
 */
router.post('/', universityOverviewController.create);

/*
 * PUT
 */
router.put('/:id', universityOverviewController.update);

/*
 * DELETE
 */
router.delete('/:id', universityOverviewController.remove);

module.exports = router;
