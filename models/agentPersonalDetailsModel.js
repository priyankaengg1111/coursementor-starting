var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var agentPersonalDetailsSchema = new Schema({
	'name' : String,
	'phone' : String,
	'companyName' : String,
	'country' : String,
	'state' : String,
	'city' : String,
	'pincode' : String,
	'certificate' : String,
	'address' : String,
	'email' : String,
	'staffNumber' : String,
	'accountName' : String,
	'accountNo' : String,
	'bankName' : String,
	'bankIFSC' : String,
	'logo' : String
});

module.exports = mongoose.model('agentPersonalDetails', agentPersonalDetailsSchema);
