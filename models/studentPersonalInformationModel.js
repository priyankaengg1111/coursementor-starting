
'use strict';
const { string } = require('joi');
var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentPersonalInformation = new Schema({
    'studentID': String,
	'salutation' : String,
	'firstName': String,
	'lastName': String,
	'middleName': String,
	'otherName': String,
	'gender':String,
	'dateOfBirth': String,
	'countryOfBirth': String,
	'nationality': String,
	'martialStatus': String,
	'differentlyAble': String,
	'passport' : String,
	'aadharCard': String,
	'firstLanguage': String,
	'visa': String,
	'refusedVisa': String,
	'dualNationality':String,
	'maritalStatus': String,
});

module.exports = mongoose.model('studentPersonalInformation',studentPersonalInformation);