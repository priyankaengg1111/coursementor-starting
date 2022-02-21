var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var universitySchema = new Schema({
	'name' : String,
	'email' : String,
	'phone' : String,
	'password' : String,
	'universityPrimaryInformation':{
		type:Schema.Types.ObjectId,
		ref:'universityPrimaryInformation'
	},
	'universityOverview':{
		type:Schema.Types.ObjectId,
		ref:'universityOverview'
	},
	'universityImage':{
		type:Schema.Types.ObjectId,
		ref: 'universityImage'
	},
	'universityRanking':{
		type:Schema.Types.ObjectId,
		ref:'universityRanking'
	},
	'universityCourses':[
		{
			type:Schema.Types.ObjectId,
			ref:'universityCourse'
		}
	],
	'universitySummary':{
		type:Schema.Types.ObjectId,
		ref:'universitySummary'
	},
	'universityAdmissions':[
		{
			type:Schema.Types.ObjectId,
			ref:'universityAdmission'
		}
	],
	'universityDocuments':[
		{
			type:Schema.Types.ObjectId,
			ref:'universityDocument'
		}
	],
	'universityScholarships':[
		{
			type:Schema.Types.ObjectId,
			ref:'universityScholarship'
		}
	],
	'universityFaqs':[
		{
			type:Schema.Types.ObjectId,
			ref:'universityFaq'
		}
	],
	'universityRankings':[
		{
			type:Schema.Types.ObjectId,
			ref:'universityRanking'
		}
	],
	'universityCommissions':[
		{
			type:Schema.Types.ObjectId,
			ref:'universityCommission'
		}
	],
	'universityImageVideos':[
		{
			type:Schema.Types.ObjectId,
			ref:'universityImageVideo'	
		}
	],
	'universityIntakes':[
		{
			type:Schema.Types.ObjectId,
			ref:'universityIntake'
		}
	]
});

module.exports = mongoose.model('university', universitySchema);
