var mongoose = require("mongoose");


var schema = mongoose.Schema;

module.exports = mongoose.model("Event", new schema({
	id:Number,
	sport_id:Number,
	description:String,
	abbreviation:String,
	order:Number,
	sumfield:String
}));