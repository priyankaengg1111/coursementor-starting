var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var agentSchema = new Schema({
	'name' : String,
	'email' : String,
	'phone' : String,
	'password' : String,
	'agentPartners':[
		{
			type:Schema.Types.ObjectId,
			ref:'agentPartner'
		}
	],
	'agentCommissions':[
		{
			type:Schema.Types.ObjectId,
			ref:'agentCommission'
		}
	],
	'agentEvaluate':{
		type:Schema.Types.ObjectId,
		ref:'agentEvaluate'
	},
	'agentPersonalDetails':{
		type:Schema.Types.ObjectId,
		ref:'agentPersonalDetails'
	},
	'students':
	[
		{
			type: Schema.Types.ObjectId,
			ref:'student'
		}
	]
	
});

module.exports = mongoose.model('agent', agentSchema);
