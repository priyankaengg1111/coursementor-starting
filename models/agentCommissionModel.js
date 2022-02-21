var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var agentCommissionSchema = new Schema({
	'date' : Date,
	'paymentMode' : String,
	'credit' : String,
	'debit' : String,
	'balance' : String
});

module.exports = mongoose.model('agentCommission', agentCommissionSchema);
