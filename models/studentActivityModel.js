var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentActivitySchema = new Schema({
	'activityStatus' : String,
	'activity' : String,
	'position' : String,
	'description' : String,
	'started' : String,
	'ended' : String,
	'apply' : String
});

module.exports = mongoose.model('studentActivity', studentActivitySchema);
