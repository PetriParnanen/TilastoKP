var mongoose = require("mongoose");


var schema = mongoose.Schema;

module.exports = mongoose.model("PlayerTeam", new schema({
	player_id:Number,
	team_id:Number,
	nickname:String,
	number:String,
	active:Boolean,
	leaving_date:Date,
	joining_date:Date
}));