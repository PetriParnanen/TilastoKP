var mongoose = require("mongoose");

var SportSchema = new mongoose.Schema({
	name:{ type: String, required: true },
});

module.exports = mongoose.model("Sport", SportSchema);