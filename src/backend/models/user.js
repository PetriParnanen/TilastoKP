var mongoose = require("mongoose");
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
	username: { type: String, required: true, unique: true},
	password: { type: String, required: true},
});

UserSchema.pre('save', function(next) {
	var user = this;
	bcrypt.hash(user.password, null, null, function(err, hash){
		if (err) return next(err);
		user.password = hash;
		next();
	});
});

UserSchema.methods.checkPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model("User", UserSchema);