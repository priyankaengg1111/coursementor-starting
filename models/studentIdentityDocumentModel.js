var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentIdentityDocumentSchema = new Schema({
	'passport' : String,
	'passportBack' : String,
	'cv' : String
});

module.exports = mongoose.model('studentIdentityDocument', studentIdentityDocumentSchema);
