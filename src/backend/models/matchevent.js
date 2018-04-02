var mongoose = require("mongoose");

var MatchEventSchema = new mongoose.Schema({
	match_id:Number,
	player_id:Number,
	event_id:Number,
	value:Number
});

module.exports = mongoose.model("MatchEvent", MatchEventSchema);