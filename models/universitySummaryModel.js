var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var universitySummarySchema = new Schema({
	'campus' : String,
	'ugYear' : String,
	'pgYear' : String,
	'deposit' : String,
	'graduateScore' : String,
	'postGraduateScore' : String,
	'ugIelts' : String,
	'pgIelts' : String,
	'ugPTE' : String,
	'pgPTE' : String,
	'intake' : String
});

module.exports = mongoose.model('universitySummary', universitySummarySchema);
