var mongoose = require("mongoose");

var PlayerSchema = new mongoose.Schema({
	firstname:String,
	lastname:String	
})

module.exports = mongoose.model("Player", PlayerSchema);