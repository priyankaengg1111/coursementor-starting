var express = require('express');
var router = express.Router();
var studentProfileRecommendationController = require('../controllers/studentProfileRecommendationController.js');

/*
 * GET
 */
router.get('/', studentProfileRecommendationController.list);

/*
 * GET
 */
router.get('/:id', studentProfileRecommendationController.show);

/*
 * POST
 */
router.post('/', studentProfileRecommendationController.create);

/*
 * PUT
 */
router.put('/:id', studentProfileRecommendationController.update);

/*
 * DELETE
 */
router.delete('/:id', studentProfileRecommendationController.remove);

module.exports = router;
