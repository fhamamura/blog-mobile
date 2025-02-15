const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
//console.log(">>>aluno.controller");
const Aluno = require("../models/user.model.js");

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

		console.log("isAdmin:", req.isAdmin);

		if (req.isAdmin == false) {
			return res.status(401).json({
				auth: false,
				message: "Sem permissão de aluno.",
			});
		}
		next();
	});
}

const getAlunos = async (req, res) => {
	try {
		//procura aluno que possua isAdmin = false
		const alunos = await Aluno.find({ isAdmin: false });
		res.status(200).json(alunos);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getAluno = async (req, res) => {
	try {
		const aluno = await Aluno.findById(req.params.id);
		if (!aluno) {
			return res.status(404).json({ message: "Aluno não encontrado!" });
		}
		res.status(200).json(aluno);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createAlunos = [
	//verifyJWT,
	async (req, res) => {
		try {
			//verifica se tem o nome
			if (!req.body.name) {
				return res
					.status(400)
					.json({ message: "O nome é obrigatório!" });
			}
			//verifica se tem o email
			if (!req.body.email) {
				return res
					.status(400)
					.json({ message: "O email é obrigatório!" });
			}
			//verifica se existe a senha
			if (!req.body.password) {
				return res
					.status(400)
					.json({ message: "A senha é obrigatória!" });
			}
			//criptografa a senha
			const salt = await bcrypt.genSalt(10);
			req.body.passwordCrypt = await bcrypt.hash(req.body.password, salt);
			//req.body.isAdmin = false;

			//insere o aluno no banco
			const aluno = await Aluno.create(req.body);
			res.status(201).json({ aluno });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
];

const updateAluno = [
	verifyJWT,
	async (req, res) => {
		try {
			//verifica se tem o nome
			if (!req.body.name) {
				return res
					.status(400)
					.json({ message: "O nome é obrigatório!" });
			}
			//verifica se tem o email
			if (!req.body.email) {
				return res
					.status(400)
					.json({ message: "O email é obrigatório!" });
			}
			//verifica se existe a senha
			if (!req.body.password) {
				return res
					.status(400)
					.json({ message: "A senha é obrigatória!" });
			}
			//criptografa a senha
			const salt = await bcrypt.genSalt(10);
			req.body.passwordCrypt = await bcrypt.hash(req.body.password, salt);

			const aluno = await Aluno.findByIdAndUpdate(
				req.params.id,
				req.body,
				{
					new: true,
				}
			);
			if (!aluno) {
				return res
					.status(404)
					.json({ message: "Aluno não encontrado!" });
			}
			res.status(200).json({ aluno });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
];

const deleteAluno = [
	verifyJWT,
	async (req, res) => {
		try {
			const aluno = await Aluno.findByIdAndDelete(req.params.id);
			if (!aluno) {
				return res
					.status(404)
					.json({ message: "Aluno não encontrado!" });
			}
			res.status(200).json({
				message: "Aluno deletado com sucesso!",
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
];

module.exports = {
	getAlunos,
	getAluno,
	createAlunos,
	updateAluno,
	deleteAluno,
};
