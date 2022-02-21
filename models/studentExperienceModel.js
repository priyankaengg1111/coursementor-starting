var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentExperienceSchema = new Schema({
	'status' : String,
	'type' : String,
	'organization' : String,
	'designation' : String,
	'role' : String,
	'started' : String,
	'ended' : String,
	'country' : String,
	'city' : String
});

module.exports = mongoose.model('studentExperience', studentExperienceSchema);
