var express = require('express');
var router = express.Router();
var adminStudyController = require('../controllers/adminStudyController.js');
var {verifyAdminToken,verifyadminIDToAdminConversion} = require('../middleware/auth')

/*
 * GET
 */
router.get('/', verifyadminIDToAdminConversion, adminStudyController.list);

/*
 * GET
 */
router.get('/:id',verifyadminIDToAdminConversion, adminStudyController.show);

/*
 * POST
 */
router.post('/',verifyAdminToken, adminStudyController.create);

/*
 * PUT
 */
router.put('/:id',verifyAdminToken, adminStudyController.update);

/*
 * DELETE
 */
router.delete('/:id', verifyAdminToken,adminStudyController.remove);

module.exports = router;
