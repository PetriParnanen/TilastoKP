var mongoose = require("mongoose");


var schema = mongoose.Schema;

module.exports = mongoose.model("Team", new schema({
	id:Number,
	name:String	
}));