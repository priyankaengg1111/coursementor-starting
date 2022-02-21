var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var universityFaqSchema = new Schema({
	'question' : String,
	'answer' : String
});

module.exports = mongoose.model('universityFaq', universityFaqSchema);
