var express = require('express');
var router = express.Router();
var universityCommissionController = require('../controllers/universityCommissionController.js');

/*
 * GET
 */
router.get('/', universityCommissionController.list);

/*
 * GET
 */
router.get('/:id', universityCommissionController.show);

/*
 * POST
 */
router.post('/', universityCommissionController.create);

/*
 * PUT
 */
router.put('/:id', universityCommissionController.update);

/*
 * DELETE
 */
router.delete('/:id', universityCommissionController.remove);

module.exports = router;
