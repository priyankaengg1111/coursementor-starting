var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentEducationSchema = new Schema({
	'highestEducation' : String,
	'status' : String,
	'specialization' : String,
	'degree' : String,
	'gradePercentage' : String,
	'marks' : String,
	'attendedForm' : String,
	'institution' : String,
	'affiliationUniversity' : String,
	'language' : String,
	'country' : String,
	'state' : String,
	'city' : String,
	'address' : String,
	'zipcode' : String
});

module.exports = mongoose.model('studentEducation', studentEducationSchema);
