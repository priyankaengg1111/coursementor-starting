var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentAddressSchema = new Schema({
	'country' : String,
	'state' : String,
	'city' : String,
	'address' : String,
	'zipcode' : String,
	'communication_address' : String
});

module.exports = mongoose.model('studentAddress', studentAddressSchema);
