var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var extraCurricularDocumentSchema = new Schema({
	'string' : String,
	'activity' : String,
	'file' : String
});

module.exports = mongoose.model('extraCurricularDocument', extraCurricularDocumentSchema);
