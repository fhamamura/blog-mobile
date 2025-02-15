const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const Post = require("../models/post.model.js");

function verifyJWT(req, res, next) {
	token = req.headers["authorization"];

	if (!token) {
		return res.status(401).json({ auth: false, message: "Sem token." });
	}

	if (token.startsWith("Bearer ")) {
		token = token.slice(7, token.length);
	}
	//console.log("Token recebido:", token);
	//console.log("Segredo JWT:", process.env.JWT_SECRET);

	jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
		if (err)
			return res
				.status(500)
				.json({ auth: false, message: "Falha ao autenticar token." });
		req.userId = decoded.id;
		req.isAdmin = decoded.isAdmin;
		if (req.isAdmin == false) {
			return res.status(401).json({
				auth: false,
				message: "Sem permissão administrativa.",
			});
		}
		next();
	});
}

const searchPosts = async (req, res) => {
	try {
		const posts = await Post.find({
			$or: [
				{ title: { $regex: req.query.qs, $options: "i" } },
				{ content: { $regex: req.query.qs, $options: "i" } },
			],
		});
		res.status(200).json({ posts });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getPosts = async (req, res) => {
	try {
		const posts = await Post.find();
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getPost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) {
			return res
				.status(404)
				.json({ message: "Postagem não encontrada!" });
		}
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createPost = [
	verifyJWT,
	async (req, res) => {
		try {
			const post = await Post.create(req.body);
			res.status(201).json({ post });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
];

const updatePost = [
	verifyJWT,
	async (req, res) => {
		try {
			const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
				new: true,
			});
			if (!post) {
				return res
					.status(404)
					.json({ message: "Postagem não encontrada!" });
			}
			res.status(200).json({ post });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
];

const deletePost = [
	verifyJWT,
	async (req, res) => {
		try {
			const post = await Post.findByIdAndDelete(req.params.id);
			if (!post) {
				return res
					.status(404)
					.json({ message: "Postagem não encontrada!" });
			}
			res.status(200).json({ message: "Postagem deletada com sucesso!" });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
];

module.exports = {
	searchPosts,
	getPosts,
	getPost,
	createPost,
	updatePost,
	deletePost,
};
