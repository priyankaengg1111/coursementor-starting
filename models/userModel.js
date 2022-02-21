'use strict';
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var userSchema = new Schema({
	'email' : String,
	'password' : String,
	'type' : Number,
	'authToken' :[
		{
			type:Number
		}
	],
	'adminData':{
		type: Schema.Types.ObjectId,
		ref :'admin'
	},
	'studentData':{
		type:Schema.Types.ObjectId,
		ref : 'student'
	},
	'universityData':{
		type:Schema.Types.ObjectId,
		ref : 'university'
	},
	'agentData':{
		type:Schema.Types.ObjectId, 
		ref : 'agent'
	}
});

module.exports = mongoose.model('user', userSchema);
