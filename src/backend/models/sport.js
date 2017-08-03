var mongoose = require("mongoose");


var schema = mongoose.Schema;

module.exports = mongoose.model("Sport", new schema({
	id:Number,
	name:String
}));