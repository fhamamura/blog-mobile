const logout = (req, res) => {
	res.json({ auth: false, token: null });
	console.log("Logout realizado com sucesso!");
};

module.exports = { logout };
