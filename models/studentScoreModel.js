var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentScoreSchema = new Schema({
	'marks' : String,
	'englishProficiency' : String,
	'gre' : String,
	'sat' : String,
	'examType':String,
	'examinationDate' : String,
	
});

module.exports = mongoose.model('studentScore', studentScoreSchema);
