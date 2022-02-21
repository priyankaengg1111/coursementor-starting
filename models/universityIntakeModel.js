var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var universityIntakeSchema = new Schema({
	'year' : String,
	'month' : String
});

module.exports = mongoose.model('universityIntake', universityIntakeSchema);
