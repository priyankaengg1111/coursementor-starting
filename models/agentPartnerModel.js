var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var agentPartnerSchema = new Schema({
	'name' : String,
	'emai' : String,
	'email' : String,
	'phone' : String,
	'address' : String,
	'city' : String,
	'state' : String,
	'country' : String,
	'logo' : String
});

module.exports = mongoose.model('agentPartner', agentPartnerSchema);
