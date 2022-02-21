var express = require('express');
var router = express.Router();
var universityAdmissionController = require('../controllers/universityAdmissionController.js');

/*
 * GET
 */
router.get('/', universityAdmissionController.list);

/*
 * GET
 */
router.get('/:id', universityAdmissionController.show);

/*
 * POST
 */
router.post('/', universityAdmissionController.create);

/*
 * PUT
 */
router.put('/:id', universityAdmissionController.update);

/*
 * DELETE
 */
router.delete('/:id', universityAdmissionController.remove);

module.exports = router;
