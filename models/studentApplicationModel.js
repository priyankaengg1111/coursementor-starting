var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentApplicationSchema = new Schema({
	'universityID' : String,
	'courseID' : String,
	'session' : String,
	'applicationProgress' : String,
	'country' : String,
	'studentID' : String,
	'studentName': String,
	'studentEmail' : String,
	'studentPhoneNo' : String,
	'universityName' : String,
	'courseName' : String,
	'countryID' : String,
});

module.exports = mongoose.model('studentApplication', studentApplicationSchema);
