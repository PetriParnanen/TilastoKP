var mongoose = require("mongoose");

var TeamSchema = new mongoose.Schema({
	name:String,
	sportId: {type: mongoose.Schema.Types.ObjectId, ref:'Sport'},
	sportName:String,
})

module.exports = mongoose.model("Team", TeamSchema);