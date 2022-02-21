var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var universityScholarshipSchema = new Schema({
	'scholarship' : String
});

module.exports = mongoose.model('universityScholarship', universityScholarshipSchema);
