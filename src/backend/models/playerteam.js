var mongoose = require("mongoose");

var PlayerTeamSchema = new mongoose.Schema({
	player_id:{type: mongoose.Schema.Types.ObjectId, ref:'Player'},
	team_id:{type: mongoose.Schema.Types.ObjectId, ref:'Team'},
	nickname:String,
	number:String,
	active:Boolean,
	leaving_date:Date,
	joining_date:Date
})

module.exports = mongoose.model("PlayerTeam", PlayerTeamSchema);