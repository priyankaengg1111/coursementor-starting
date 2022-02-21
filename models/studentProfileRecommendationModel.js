var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentProfileRecommendationSchema = new Schema({
	'type' : String,
	'organization' : String,
	'recommenderName' : String,
	'email' : String,
	'relation' : String,
	'designation' : String,
	'number' : String,
	'address' : String,
	'letter' : String
});

module.exports = mongoose.model('studentProfileRecommendation', studentProfileRecommendationSchema);
