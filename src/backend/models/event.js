var mongoose = require("mongoose");

var schema = mongoose.Schema;

module.exports = mongoose.model("Event", new schema({
	sportId: {type: mongoose.Schema.Types.ObjectId, ref: 'Sport'},
	description:String,
	abbreviation:String,
	order:Number,
	sumfield:String,
	receiptOnly:Boolean
}));