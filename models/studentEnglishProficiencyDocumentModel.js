var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var  studentEnglishProficiencyDocumentModel = new Schema({
	'test' : String,
	'file' : String
});

module.exports = mongoose.model('studentEnglishProficiencyDocument',  studentEnglishProficiencyDocumentModel);
