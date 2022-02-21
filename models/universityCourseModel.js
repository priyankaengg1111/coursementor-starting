var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var universityCourseSchema = new Schema({
	'courseName' : String,
	'duration' : String,
	'fee' : String,
	'studyField' : String,
	'courseLevel' : String,
	'cgpa' : String,
	'eligibility' : String,
	'english' : String,
	'website' : String,
	'description' : String,
	'exam' : String,
	'month' : String,
	'year' : String,
	'tuitionFee': String,
});

module.exports = mongoose.model('universityCourse', universityCourseSchema);
