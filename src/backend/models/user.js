var mongoose = require("mongoose");

var schema = mongoose.Schema;

module.exports = mongoose.model("User", new schema({
	uname: {type: String, unique:true},
	pword: String,
}));