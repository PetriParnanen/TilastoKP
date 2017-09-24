var mongoose = require("mongoose");

var SportSchema = new mongoose.Schema({
	name:String,
});

module.exports = mongoose.model("Sport", SportSchema);