var express = require('express');
var router = express.Router();
var universityScholarshipController = require('../controllers/universityScholarshipController.js');

/*
 * GET
 */
router.get('/', universityScholarshipController.list);

/*
 * GET
 */
router.get('/:id', universityScholarshipController.show);

/*
 * POST
 */
router.post('/', universityScholarshipController.create);

/*
 * PUT
 */
router.put('/:id', universityScholarshipController.update);

/*
 * DELETE
 */
router.delete('/:id', universityScholarshipController.remove);

module.exports = router;
