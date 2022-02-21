var express = require('express');
var router = express.Router();
var adminEnglishProficiencyController = require('../controllers/adminEnglishProficiencyController.js');
var {verifyAdminToken,verifyadminIDToAdminConversion} = require('../middleware/auth')

/*
 * GET
 */
router.get('/', verifyadminIDToAdminConversion, adminEnglishProficiencyController.list);

/*
 * GET
 */
router.get('/:id',verifyadminIDToAdminConversion, adminEnglishProficiencyController.show);

/*
 * POST
 */
router.post('/',verifyAdminToken, adminEnglishProficiencyController.create);

/*
 * PUT
 */
router.put('/:id',verifyAdminToken, adminEnglishProficiencyController.update);

/*
 * DELETE
 */
router.delete('/:id', verifyAdminToken,adminEnglishProficiencyController.remove);

module.exports = router;
