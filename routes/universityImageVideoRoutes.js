var express = require('express');
var router = express.Router();
var universityImageVideoController = require('../controllers/universityImageVideoController.js');

/*
 * GET
 */
router.get('/', universityImageVideoController.list);

/*
 * GET
 */
router.get('/:id', universityImageVideoController.show);

/*
 * POST
 */
router.post('/', universityImageVideoController.create);

/*
 * PUT
 */
router.put('/:id', universityImageVideoController.update);

/*
 * DELETE
 */
router.delete('/:id', universityImageVideoController.remove);

module.exports = router;
