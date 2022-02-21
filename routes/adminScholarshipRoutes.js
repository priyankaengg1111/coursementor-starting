var express = require('express');
var router = express.Router();
var adminScholarhsipController = require('../controllers/adminScholarshipController')
var {verifyAdminToken,verifyadminIDToAdminConversion} = require('../middleware/auth')


/*
 * GET
 */
router.get('/', adminScholarhsipController.list);

/*
 * GET
 */
router.get('/:id', adminScholarhsipController.show);

/*
 * POST
 */
router.post('/',verifyAdminToken, adminScholarhsipController.create);

/*
 * PUT
 */
router.put('/:id',verifyAdminToken, adminScholarhsipController.update);

/*
 * DELETE
 */
router.delete('/:id', verifyAdminToken,adminScholarhsipController.remove);

module.exports = router;
