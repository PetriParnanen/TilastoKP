var mongoose = require("mongoose");


var schema = mongoose.Schema;

module.exports = mongoose.model("MatchEvent", new schema({
	match_id:Number,
	player_id:Number,
	event_id:Number,
	value:Number
}));