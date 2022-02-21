var express = require('express');
var router = express.Router();
var studentBookmarkController = require('../controllers/studentBookmarkController.js');
var {fileUpload} = require('../middleware/fileUpload')
/*
 * GET
 */
router.get('/',studentBookmarkController.list);

/*
 * GET
 */
router.get('/:id', studentBookmarkController.show);

/*
 * POST
 */
router.post('/', fileUpload, studentBookmarkController.create);

/*
 * PUT
 */
router.put('/:id',fileUpload, studentBookmarkController.update);

/*
 * DELETE
 */
router.delete('/:id', studentBookmarkController.remove);

module.exports = router;
