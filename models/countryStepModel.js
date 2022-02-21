var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var countryStepSchema = new Schema({
	'value' : String
});

module.exports = mongoose.model('countryStep', countryStepSchema);
