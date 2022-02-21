var express = require('express');
var router = express.Router();
var studentEducationController = require('../controllers/studentEducationController.js');

/*
 * GET
 */
router.get('/', studentEducationController.list);

/*
 * GET
 */
router.get('/:id', studentEducationController.show);

/*
 * POST
 */
router.post('/', studentEducationController.create);

/*
 * PUT
 */
router.put('/:id', studentEducationController.update);

/*
 * DELETE
 */
router.delete('/:id', studentEducationController.remove);

module.exports = router;
