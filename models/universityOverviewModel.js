var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var universityOverviewSchema = new Schema({
	'foundedYear' : String,
	'ranking' : String,
	'acceptanceRate' : String,
	'course' : String,
	'courseNo' : String,
	'intakes' : String,
	'courses' : String,
	'english' : String,
	'cgpa' : String,
	'rate' : String,
	'month': String,
	'year': String
});

module.exports = mongoose.model('universityOverview', universityOverviewSchema);
