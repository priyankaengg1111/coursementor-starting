var express = require('express');
var router = express.Router();
var universityImageController = require('../controllers/universityImageController.js');

/*
 * GET
 */
router.get('/', universityImageController.list);

/*
 * GET
 */
router.get('/:id', universityImageController.show);

/*
 * POST
 */
router.post('/', universityImageController.create);

/*
 * PUT
 */
router.put('/:id', universityImageController.update);

/*
 * DELETE
 */
router.delete('/:id', universityImageController.remove);

module.exports = router;
