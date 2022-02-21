var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var universityCommissionSchema = new Schema({
	'courseName' : String,
	'fee' : String,
	'commissionType' : String,
	'commissionValue' : String,
	'timeType' : String,
	'timeValue' : String
});

module.exports = mongoose.model('universityCommission', universityCommissionSchema);
