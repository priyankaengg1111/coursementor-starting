'use strict';
const { string } = require('joi');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentSchema = new Schema({
	'password': String,
	'name': String,
	'phone': String,
	'email': String,
	'studentPersonalInformation':{
		type:Schema.Types.ObjectId,
		ref:'studentPersonalInformation'
	},
	'studentAddress': {
		type:Schema.Types.ObjectId,
		ref:'studentAddress'
	},
	'studentFamilies':[
		{
			type:Schema.Types.ObjectId,
			ref:'studentFamily'
		}
	],
	'studentEducations':[
		{
			type:Schema.Types.ObjectId,
			ref:'studentEducation'
		}
	],
	'studentScore':{
		type:Schema.Types.ObjectId,
		ref:'studentScore'
	},
	'studentExperiences':[
		{
			type:Schema.Types.ObjectId,
			ref:'studentExperience'
		}
	],
	'studentPersonalDetails':{
		type:Schema.Types.ObjectId,
		ref:'studentPersonalDetails'
	},
	'studentActivities':[
		{
		type:Schema.Types.ObjectId,
		ref:'studentActivity'
		}
	],
	'studentProfileRecommendations':[
		{
		type:Schema.Types.ObjectId,
		ref:'studentProfileRecommendation'
		}
	],
	'studentBookmarks':[
		{
		type:Schema.Types.ObjectId,
		ref:'studentBookmark'
		}
	],
	'studentApplications':[
		{
		type:Schema.Types.ObjectId,
		ref:'studentApplication'
		}
	],

	'studentIdentityDocument':{
		type:Schema.Types.ObjectId,
		ref:'studentIdentityDocument'
	},
	'studentEducationDocument':{
		type:Schema.Types.ObjectId,
		ref:'studentEducationDocument'
	},
	'studentExperienceDocument':{
		type:Schema.Types.ObjectId,
		ref:'studentExperienceDocument'
	},
	'studentEnglishProficiencyDocument':{
		type:Schema.Types.ObjectId,
		ref:'studentEnglishProficiencyDocument'
	},
	'studentExtraCurricularDocument':{
		type:Schema.Types.ObjectId,
		ref:'studentExtraCurricularDocument'
	},
	'studentOtherDocument':{
		type:Schema.Types.ObjectId,
		ref:'studentOtherDocument'
	},
	'studentRecommendationDocument':{
		type:Schema.Types.ObjectId,
		ref:'studentRecommendationDocument'
	}
});

module.exports = mongoose.model('student', studentSchema);
