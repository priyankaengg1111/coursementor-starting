var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var adminCountrySchema = new Schema({
	'country' : String,
	'countrySteps' : Array
});

module.exports = mongoose.model('adminCountry', adminCountrySchema);
