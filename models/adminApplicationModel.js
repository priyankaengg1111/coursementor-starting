var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var adminApplicationSchema = new Schema({
	'application' : String
});

module.exports = mongoose.model('adminApplication', adminApplicationSchema);
