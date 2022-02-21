var express = require('express');
var router = express.Router();
var universityFaqController = require('../controllers/universityFaqController.js');

/*
 * GET
 */
router.get('/', universityFaqController.list);

/*
 * GET
 */
router.get('/:id', universityFaqController.show);

/*
 * POST
 */
router.post('/', universityFaqController.create);

/*
 * PUT
 */
router.put('/:id', universityFaqController.update);

/*
 * DELETE
 */
router.delete('/:id', universityFaqController.remove);

module.exports = router;
