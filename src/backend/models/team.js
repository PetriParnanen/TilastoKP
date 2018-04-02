var mongoose = require("mongoose");

var TeamSchema = new mongoose.Schema({
	user: { type: String, ref:'User'},
	name: { type: String, required:true },
	sportId: {type: mongoose.Schema.Types.ObjectId, ref:'Sport'},
	sportName:String,
})

module.exports = mongoose.model("Team", TeamSchema);