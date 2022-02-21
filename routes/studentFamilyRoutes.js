var express = require('express');
var router = express.Router();
var studentFamilyController = require('../controllers/studentFamilyController.js');

/*
 * GET
 */
router.get('/', studentFamilyController.list);

/*
 * GET
 */
router.get('/:id', studentFamilyController.show);

/*
 * POST
 */
router.post('/', studentFamilyController.create);

/*
 * PUT
 */
router.put('/:id', studentFamilyController.update);

/*
 * DELETE
 */
router.delete('/:id', studentFamilyController.remove);

module.exports = router;
