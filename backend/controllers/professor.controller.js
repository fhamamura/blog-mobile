const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
//console.log(">>>professor.controller");
const Professor = require("../models/user.model.js");

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

const getProfessores = async (req, res) => {
	try {
		//procura professor que possou isAdmin = true
		const professores = await Professor.find({ isAdmin: true });
		res.status(200).json(professores);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const getProfessor = async (req, res) => {
	try {
		const professor = await Professor.findById(req.params.id);
		if (!professor) {
			return res
				.status(404)
				.json({ message: "Professor não encontrado!" });
		}
		res.status(200).json(professor);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

const createProfessores = [
	verifyJWT,
	async (req, res) => {
		try {
			//verifica se existe nome
			if (!req.body.name) {
				return res
					.status(400)
					.json({ message: "O nome é obrigatório!" });
			}
			//verifica se existe email
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

			//insere o professor no banco
			const professor = await Professor.create(req.body);
			res.status(201).json({ professor });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
];

const updateProfessor = [
	verifyJWT,
	async (req, res) => {
		try {
			//verifica se existe nome
			if (!req.body.name) {
				return res
					.status(400)
					.json({ message: "O nome é obrigatório!" });
			}
			//verifica se existe email
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

			const professor = await Professor.findByIdAndUpdate(
				req.params.id,
				req.body,
				{
					new: true,
				}
			);
			if (!professor) {
				return res
					.status(404)
					.json({ message: "Professor não encontrado!" });
			}
			res.status(200).json({ professor });
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
];

const deleteProfessor = [
	verifyJWT,
	async (req, res) => {
		try {
			const professor = await Professor.findByIdAndDelete(req.params.id);
			if (!professor) {
				return res
					.status(404)
					.json({ message: "Professor não encontrado!" });
			}
			res.status(200).json({
				message: "Professor deletado com sucesso!",
			});
		} catch (error) {
			res.status(500).json({ message: error.message });
		}
	},
];

module.exports = {
	verifyJWT,
	getProfessores,
	getProfessor,
	createProfessores,
	updateProfessor,
	deleteProfessor,
};
