var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentExtraCurricularDocumentSchema = new Schema({
	'activity' : String,
	'file' : String
});

module.exports = mongoose.model('studentExtraCurricularDocument', studentExtraCurricularDocumentSchema);
