var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentExperienceDocumentSchema = new Schema({
	'companyName' : String,
	'document' : String,
	'action' : String,
	'workStatus' : String,
	'workType' : String,
	'organization' : String,
	'start' : String,
	'ended' : String,
	'designation' : String,
	'role' : String,
	'country' : String,
	'city' : String
});

module.exports = mongoose.model('studentExperienceDocument', studentExperienceDocumentSchema);
