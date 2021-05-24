const mongoose = require ('mongoose');
var Schema = mongoose.Schema;

var userSchema = {
	username: String,
	email: String,
	password: String,
	roleId: Number,
	foodLog: Array
}

module.exports = mongoose.model("users", userSchema);