var express = require('express');
var router = express.Router();
var universityIntakeController = require('../controllers/universityIntakeController.js');

/*
 * GET
 */
router.get('/', universityIntakeController.list);

/*
 * GET
 */
router.get('/:id', universityIntakeController.show);

/*
 * POST
 */
router.post('/', universityIntakeController.create);

/*
 * PUT
 */
router.put('/:id', universityIntakeController.update);

/*
 * DELETE
 */
router.delete('/:id', universityIntakeController.remove);

module.exports = router;
