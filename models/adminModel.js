var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var adminSchema = new Schema({
	'name' : String,
	'email' : String,
	'phone' : String,
	'password' : String,
	'adminApplications':[
		{
			type:Schema.Types.ObjectId,
			ref:'adminApplication'
		}
	],
	'adminDocuments':[
		{
			type:Schema.Types.ObjectId,
			ref:'adminDocument'
		}
	],
	'adminScholarships':[
		{
			type:Schema.Types.ObjectId,
			ref:'adminScholarship'
		}
	]
});

module.exports = mongoose.model('admin', adminSchema);
