var mongoose = require("mongoose");


var schema = mongoose.Schema;

module.exports = mongoose.model("Match", new schema({
	id:Number,
	team_id:Number,
	opponent:String,
	date:Date	
}));