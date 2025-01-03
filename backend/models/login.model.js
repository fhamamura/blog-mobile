const mongoose = require("mongoose");

const LoginSchema = new mongoose.Schema({
	email: {
		type: String,
		required: [true, "O email é obrigatório"],
	},
	/* 	password: {
		type: String,
		required: [true, "A senha é obrigatória"],
	}, */
});

const Login = mongoose.model("Login", LoginSchema);

module.exports = Login;
