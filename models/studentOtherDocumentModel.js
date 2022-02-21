var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentOtherDocumentSchema = new Schema({
	'name' : String,
	'file' : String
});

module.exports = mongoose.model('studentOtherDocument', studentOtherDocumentSchema);
