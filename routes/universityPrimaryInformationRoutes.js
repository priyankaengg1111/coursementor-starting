var express = require('express');
var router = express.Router();
var universityPrimaryInformationController = require('../controllers/universityPrimaryInformationController.js');

/*
 * GET
 */
router.get('/', universityPrimaryInformationController.list);

/*
 * GET
 */
router.get('/:id', universityPrimaryInformationController.show);

/*
 * POST
 */
router.post('/', universityPrimaryInformationController.create);

/*
 * PUT
 */
router.put('/:id', universityPrimaryInformationController.update);

/*
 * DELETE
 */
router.delete('/:id', universityPrimaryInformationController.remove);

module.exports = router;
