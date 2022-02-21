var express = require('express');
var router = express.Router();
var universityCourseController = require('../controllers/universityCourseController.js');

/*
 * GET
 */
router.get('/', universityCourseController.list);

/*
 * GET
 */
router.get('/:id', universityCourseController.show);

/*
 * POST
 */
router.post('/', universityCourseController.create);

/*
 * PUT
 */
router.put('/:id', universityCourseController.update);

/*
 * DELETE
 */
router.delete('/:id', universityCourseController.remove);

module.exports = router;
