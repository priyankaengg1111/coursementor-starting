var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var universityDocumentSchema = new Schema({
	'document' : String
});

module.exports = mongoose.model('universityDocument', universityDocumentSchema);
