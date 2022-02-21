var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var adminDocumentSchema = new Schema({
	'document' : String
});

module.exports = mongoose.model('adminDocument', adminDocumentSchema);
