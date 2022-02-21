var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentEducationDocumentSchema = new Schema({
	'marksheet10' : String,
	'marksheet12' : String,
	'ugDegree' : String,
	'ugConsolidate' : String,
	'ugConsolidatedMarksheet' : String,
	'ugMarksheet' : String,
	'pgDegree' : String,
	'pgDegreeConsolidatedMarksheet' : String,
	'pgMarksheet' : String
});

module.exports = mongoose.model('studentEducationDocument', studentEducationDocumentSchema);
