var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var studentBookmarkSchema = new Schema({
	'universityID' : String,
	'name' : String,
	'logo' : String
});

module.exports = mongoose.model('studentBookmark', studentBookmarkSchema);
