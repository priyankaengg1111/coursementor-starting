var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentPersonalDetailsSchema = new Schema({
	'picture' : String,
	'aboutMe' : String,
	'email' : String,
	'location' : String,
	'state' : String,
	'city' : String,
	'country' : String,
	'dateOfBirth' : String,
	'countryCode' : String,
	'phone' : String,
	'gender' : String
});

module.exports = mongoose.model('studentPersonalDetails', studentPersonalDetailsSchema);
