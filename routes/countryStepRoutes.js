var express = require('express');
var router = express.Router();
var countryStepController = require('../controllers/countryStepController.js');

/*
 * GET
 */
router.get('/', countryStepController.list);

/*
 * GET
 */
router.get('/:id', countryStepController.show);

/*
 * POST
 */
router.post('/', countryStepController.create);

/*
 * PUT
 */
router.put('/:id', countryStepController.update);

/*
 * DELETE
 */
router.delete('/:id', countryStepController.remove);

module.exports = router;
