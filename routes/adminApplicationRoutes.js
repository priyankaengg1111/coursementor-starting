var express = require('express');
var router = express.Router();
var adminApplicationController = require('../controllers/adminApplicationController.js');
var {verifyAdminToken,verifyadminIDToAdminConversion} = require('../middleware/auth')

/*
 * GET
 */
router.get('/', verifyadminIDToAdminConversion, adminApplicationController.list);

/*
 * GET
 */
router.get('/:id',verifyadminIDToAdminConversion, adminApplicationController.show);

/*
 * POST
 */
router.post('/',verifyAdminToken, adminApplicationController.create);

/*
 * PUT
 */
router.put('/:id',verifyAdminToken, adminApplicationController.update);

/*
 * DELETE
 */
router.delete('/:id', verifyAdminToken,adminApplicationController.remove);

module.exports = router;
