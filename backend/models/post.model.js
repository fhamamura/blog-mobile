const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema({
	title: {
		type: String,
		required: [true, "O título é obrigatório"],
	},
	content: {
		type: String,
		required: [true, "O conteúdo é obrigatório"],
	},
	author: {
		type: String,
		required: [true, "O autor é obrigatório"],
	},
	timestamp: {
		type: Date,
		default: Date.now,
	},
});

const Post = mongoose.model("Post", PostSchema);

module.exports = Post;
