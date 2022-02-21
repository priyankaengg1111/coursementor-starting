var express = require('express');
var router = express.Router();
var studentExperienceController = require('../controllers/studentExperienceController.js');

/*
 * GET
 */
router.get('/', studentExperienceController.list);

/*
 * GET
 */
router.get('/:id', studentExperienceController.show);

/*
 * POST
 */
router.post('/', studentExperienceController.create);

/*
 * PUT
 */
router.put('/:id', studentExperienceController.update);

/*
 * DELETE
 */
router.delete('/:id', studentExperienceController.remove);

module.exports = router;
