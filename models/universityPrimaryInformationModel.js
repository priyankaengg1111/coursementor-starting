var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var universityPrimaryInformationSchema = new Schema({
	'name' : String,
	'location' : String,
	'tyoe' : String,
	'type' : String,
	'description' : String,
	'website' : String,
	'phone' : String,
	'organization' : String,
	'city': String,
	'state': String,
	'address' : String,
	'pincode': String,
	'country': String
});

module.exports = mongoose.model('universityPrimaryInformation', universityPrimaryInformationSchema);
