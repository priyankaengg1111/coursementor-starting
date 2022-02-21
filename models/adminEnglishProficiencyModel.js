var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var adminEnglishProficiencySchema = new Schema({
	'EnglishProficiency' : String
	
});

module.exports = mongoose.model('adminEnglishProficiency', adminEnglishProficiencySchema);
