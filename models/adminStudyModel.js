var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var adminStudySchema = new Schema({
	'Study' : String
});

module.exports = mongoose.model('adminStudy', adminStudySchema);
