var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentFamilySchema = new Schema({
	'relationship' : String,
	'salutation' : String,
	'firstName' : String,
	'middleName' : String,
	'lastName' : String,
	'email' : String,
	'mobile' : String,
	'occupation' : String,
	'qualification' : String
});

module.exports = mongoose.model('studentFamily', studentFamilySchema);
