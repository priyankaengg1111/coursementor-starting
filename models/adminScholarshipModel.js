var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var adminScholarshipSchema = new Schema({
	'scholarship' : String
});

module.exports = mongoose.model('adminScholarship', adminScholarshipSchema);
