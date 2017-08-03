var mongoose = require("mongoose");


var schema = mongoose.Schema;

module.exports = mongoose.model("Player", new schema({
	id:Number,
	firstname:String,
	lastname:String	
}));