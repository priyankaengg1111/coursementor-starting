var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var universityRankingSchema = new Schema({
	'agencyName' : String,
	'rank' : String,
	'year' : String,
	'certificate' : String
});

module.exports = mongoose.model('universityRanking', universityRankingSchema);
