var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentRecommendationDocumentSchema = new Schema({
	'name' : String,
	'document' : String,
	'action' : String,
	'referenceType' : String,
	'organizationName' : String,
	'recommenderName' : String,
	'email' : String,
	'recommenderRelation' : String,
	'recommenderDesignation' : String,
	'number' : String,
	'address' : String,
	'recommendationLetter' : String
});

module.exports = mongoose.model('studentRecommendationDocument', studentRecommendationDocumentSchema);
