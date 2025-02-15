const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: [true, "O nome é obrigatório"],
	},
	email: {
		type: String,
		unique: true,
		required: [true, "O email é obrigatório"],
	},
	password: {
		type: String,
		required: [true, "A senha é obrigatória"],
	},
	passwordCrypt: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	isAdmin: {
		type: Boolean,
		default: false,
	},
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
