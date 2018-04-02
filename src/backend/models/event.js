var mongoose = require("mongoose");

var EventSchema = new mongoose.Schema({
	sportId: { type: mongoose.Schema.Types.ObjectId, ref: 'Sport'},
	description:String,
	abbreviation:String,
	order:Number,
	sumfield:String,
	receiptOnly:Boolean
});

module.exports = mongoose.model("Event", EventSchema);