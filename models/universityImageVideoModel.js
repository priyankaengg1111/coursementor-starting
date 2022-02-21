var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var universityImageVideoSchema = new Schema({
	'link' : String,
	'type' : String
});

module.exports = mongoose.model('universityImageVideo', universityImageVideoSchema);
