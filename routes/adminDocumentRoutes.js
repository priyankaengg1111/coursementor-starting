var express = require('express');
var router = express.Router();
var adminDocumentController = require('../controllers/adminDocumentController.js');
var {verifyAdminToken,verifyadminIDToAdminConversion} = require('../middleware/auth')

/*
 * GET
 */
router.get('/',  adminDocumentController.list);

/*
 * GET
 */
router.get('/:id', adminDocumentController.show);

/*
 * POST
 */
router.post('/',verifyAdminToken, adminDocumentController.create);

/*
 * PUT
 */
router.put('/:id',verifyAdminToken, adminDocumentController.update);

/*
 * DELETE
 */
router.delete('/:id', verifyAdminToken,adminDocumentController.remove);

module.exports = router;
