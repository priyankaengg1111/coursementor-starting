var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var universityImageSchema = new Schema({
	'image' : String,
	'logo' : String,
	'coverPic' : String,
	
});

module.exports = mongoose.model('universityImage', universityImageSchema);
