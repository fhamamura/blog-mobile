const request = require("supertest");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
const app = require("../index.js");
const Blog = require("../models/post.model.js");
require("dotenv").config();

let mongoServer;

beforeAll(async () => {
	mongoServer = await MongoMemoryServer.create();
	const uri = mongoServer.getUri();

	await mongoose.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
});

afterAll(async () => {
	await mongoose.connection.dropDatabase();
	await mongoose.connection.close();
	await mongoose.disconnect();
	await mongoServer.stop();
});

describe("Blog API", () => {
	let postId;

	/* 	it("Criar novo post", async () => {
		const newPost = {
			title: "Test Blog Post",
			content: "This is a test blog post",
			author: "Test Author",
		};

		const res = await request(app).post("/posts").send(newPost);
		expect(res.statusCode).toBe(201);
		expect.objectContaining({
			title: "Test Blog Post",
			content: "This is a test blog post",
			author: "Test Author",
		});

		postId = res.body.post._id; // Salva o ID do post criado para os próximos testes
	}); */

	it("Mostrar todos os posts", async () => {
		const res = await request(app).get("/posts");
		expect(res.statusCode).toBe(200);
		expect(Object.keys(res.body).length).toBe(1);
	});

	// Teste para atualizar um post
	/* 	it("Atualizar um post", async () => {
		const updatedData = {
			title: "Updated Blog Post",
			content: "This is an updated test blog post",
			author: "Updated Author",
		};

		const res = await request(app)
			.put(`/posts/${postId}`)
			.send(updatedData);
		expect(res.statusCode).toBe(200);
		expect.objectContaining({
			title: "Updated Blog Post",
			content: "This is an updated test blog post",
			author: "Updated Author",
		});
	}); */

	/* 	// Teste para deletar um post
	it("Apagar um post", async () => {
		const res = await request(app).delete(`/posts/${postId}`);
		expect(res.statusCode).toBe(200);

		// Verificando se o post foi realmente deletado
		const checkRes = await request(app).get(`/posts/${postId}`);
		expect(checkRes.statusCode).toBe(404);
	});

	// Teste para garantir que a rota de deletar retorne 404 se o post não for encontrado
	it("Deve retornar 404", async () => {
		const res = await request(app).delete(`/posts/${postId}`);
		expect(res.statusCode).toBe(404);
		expect(res.body.message).toBe("Postagem não encontrada!");
	}); */
});
