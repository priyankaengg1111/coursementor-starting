var express = require('express');
var router = express.Router();
var universityRankingController = require('../controllers/universityRankingController.js');

/*
 * GET
 */
router.get('/', universityRankingController.list);

/*
 * GET
 */
router.get('/:id', universityRankingController.show);

/*
 * POST
 */
router.post('/', universityRankingController.create);

/*
 * PUT
 */
router.put('/:id', universityRankingController.update);

/*
 * DELETE
 */
router.delete('/:id', universityRankingController.remove);

module.exports = router;
