var express = require('express');
var router = express.Router();
var universityDocumentController = require('../controllers/universityDocumentController.js');

/*
 * GET
 */
router.get('/', universityDocumentController.list);

/*
 * GET
 */
router.get('/:id', universityDocumentController.show);

/*
 * POST
 */
router.post('/', universityDocumentController.create);

/*
 * PUT
 */
router.put('/:id', universityDocumentController.update);

/*
 * DELETE
 */
router.delete('/:id', universityDocumentController.remove);

module.exports = router;
