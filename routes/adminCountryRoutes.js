var express = require('express');
var router = express.Router();
var adminCountryController = require('../controllers/adminCountryController.js');

/*
 * GET
 */
router.get('/', adminCountryController.list);

/*
 * GET
 */
router.get('/:id', adminCountryController.show);

/*
 * POST
 */
router.post('/', adminCountryController.create);

/*
 * PUT
 */
router.put('/:id', adminCountryController.update);

/*
 * DELETE
 */
router.delete('/:id', adminCountryController.remove);

module.exports = router;
