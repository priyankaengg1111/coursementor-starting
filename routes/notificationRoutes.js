var express = require('express');
var router = express.Router();
var notificationController = require('../controllers/notificationController.js');


router.get('/', notificationController.list);


router.post('/', notificationController.create);



module.exports = router;
