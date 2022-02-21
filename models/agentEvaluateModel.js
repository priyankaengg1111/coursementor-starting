var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var agentEvaluateSchema = new Schema({
	'country' : String,
	'state' : String,
	'university' : String,
	'education' : String,
	'percentafe' : String,
	'percentage' : String,
	'passing' : String,
	'passingYear' : String,
	'english' : String,
	'Overall' : String,
	'reading' : String,
	'listening' : String,
	'speaking' : String,
	'writing' : String
});

module.exports = mongoose.model('agentEvaluate', agentEvaluateSchema);
