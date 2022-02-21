var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var universityAdmissionSchema = new Schema({
	'point' : String
});

module.exports = mongoose.model('universityAdmission', universityAdmissionSchema);
