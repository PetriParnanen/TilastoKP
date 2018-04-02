var mongoose = require("mongoose");

var MatchSchema = new mongoose.Schema({
	team_id:{ type: mongoose.Schema.Types.ObjectId, ref:'Team', required: true },
	opponent:{ type: String, required: true},
	date:Date,
	players: [{
		player_id: {type: mongoose.Schema.Types.ObjectId, ref:'Player'},
		events: [{
			event_id: {type: mongoose.Schema.Types.ObjectId, ref:'Event'},
			value:Number
		}]
	}]
});

module.exports = mongoose.model("Match", MatchSchema);