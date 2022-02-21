var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var notificationSchema = new Schema({
	'message' : String,
	'studentID' : {
	 	type: Schema.Types.ObjectId,
	 	ref: 'student'
	},
	type:Number
});

module.exports = mongoose.model('notification', notificationSchema);
