const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const login = async (req, res) => {
	try {
		//verificar se o email e senha foram fornecidos
		const { email, password } = req.body;
		if (!email || !password) {
			return res.status(400).json({
				message: "Email e senha são obrigatórios!",
			});
		}

		//encontrar o usuario pelo email
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(404).json({ message: "Usuário não encontrado!" });
		}

		//comparar a senha fornecida com a senha do usuario
		const validPassword = await bcrypt.compare(
			password,
			user.passwordCrypt
		);
		if (!validPassword) {
			return res.status(401).json({ message: "Senha inválida!" });
		}

		if (validPassword) {
			const payload = {
				id: user._id,
				isAdmin: user.isAdmin,
			};
			const token = jwt.sign(payload, process.env.JWT_SECRET, {
				expiresIn: "1h",
			});
			return res.status(200).json({
				user: {
					id: user._id,
					name: user.name,
					email: user.email,
					isAdmin: user.isAdmin,
				},
				auth: true,
				token: token,
			});
		} else {
			res.status(401).json({ message: "Usuário ou senha inválidos" });
		}
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

module.exports = { login };
