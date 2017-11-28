var mongoose = require("mongoose");


var schema = mongoose.Schema;

module.exports = mongoose.model("Match", new schema({
	team_id:{type: mongoose.Schema.Types.ObjectId, ref:'Team'},
	opponent:String,
	date:Date,
	players: [{
		player_id: {type: mongoose.Schema.Types.ObjectId, ref:'Player'},
		events: [{
			event_id: {type: mongoose.Schema.Types.ObjectId, ref:'Event'},
			value:Number
		}]
	}]
}));