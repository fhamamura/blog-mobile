const express = require("express");
const mongoose = require("mongoose");
const Post = require("./models/post.model.js");
const Professor = require("./models/user.model.js");
const Login = require("./models/login.model.js");
const Aluno = require("./models/user.model.js");
const postRoute = require("./routes/post.route.js");
const professorRoute = require("./routes/professor.route.js");
const alunosRoute = require("./routes/aluno.route.js");
const postLogin = require("./routes/login.route.js");
const getLogout = require("./routes/logout.route.js");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
require("dotenv").config();
const cors = require("cors");

//Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Configuração Swagger
const swaggerOptions = {
	swaggerDefinition: {
		openapi: "3.0.0",
		info: {
			title: "Blog API",
			version: "1.0.0",
			description: "API para um blog simples",
		},
		servers: [
			{
				url: "http://localhost:5000",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

//Routes
app.use("/posts", postRoute);
app.use("/professores", professorRoute);
app.use("/alunos", alunosRoute);
app.use("/login", postLogin);
app.use("/logout", getLogout);

mongoose
	.connect(process.env.MONGO_URI)
	.then(() => {
		console.log("Conectado ao banco de dados!");
		/* 		app.listen(process.env.PORT, () => {
			console.log("Server rodando na porta:", process.env.PORT);
		}); */
	})
	.catch((err) => {
		console.log("Erro ao conectar ao Banco de Dados: ", err);
	});

const server = app.listen(process.env.PORT, function () {
	console.log("Server rodando na porta:", process.env.PORT);
});
module.exports = server;
