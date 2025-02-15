const express = require("express");
const Post = require("../models/post.model.js");
const router = express.Router();
const {
	searchPosts,
	getPosts,
	getPost,
	createPost,
	updatePost,
	deletePost,
} = require("../controllers/post.controller.js");

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - content
 *         - author
 *       properties:
 *         id:
 *           type: string
 *           description: O ID gerado automaticamente.
 *         title:
 *           type: string
 *           description: O título do post.
 *         content:
 *           type: string
 *           description: O conteúdo do post.
 *         author:
 *           type: string
 *           description: O autor do post.
 *         timestamp:
 *           type: string
 *           format: date
 *           description: A data em que o post foi criado.
 *       example:
 *         title: "Meu primeiro post"
 *         content: "Este é o conteúdo do post."
 *         author: "Eu mesmo"
 */

/**
 * @swagger
 * tags:
 *   name: Posts
 *   description: API de gerenciamento de posts do blog
 */

/**
 * @swagger
 * /posts:
 *   get:
 *     summary: Retorna todos os posts
 *     tags: [Posts]
 *     responses:
 *       200:
 *         description: Lista de todos os posts.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 */

/**
 * @swagger
 * /posts:
 *   post:
 *     summary: Cria um novo post
 *     tags: [Posts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: O post foi criado com sucesso.
 *       401:
 *         description: Não autorizado.
 *       500:
 *         description: Erro do servidor.
 */

/**
 * @swagger
 * /posts/{id}:
 *   put:
 *     summary: Atualiza um post existente
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do post a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Post'
 *     responses:
 *       200:
 *         description: O post foi atualizado com sucesso.
 *       404:
 *         description: Post não encontrado.
 *       401:
 *         description: Não autorizado.
 *       500:
 *         description: Erro do servidor.
 */

/**
 * @swagger
 * /posts/{id}:
 *   delete:
 *     summary: Exclui um post
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do post a ser excluído
 *     responses:
 *       200:
 *         description: O post foi excluído com sucesso.
 *       404:
 *         description: Post não encontrado.
 *       401:
 *         description: Não autorizado.
 *       500:
 *         description: Erro do servidor.
 */

/**
 * @swagger
 * /posts/{id}:
 *   get:
 *     summary: Retorna um post pelo ID
 *     tags: [Posts]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: O ID do post a ser retornado
 *     responses:
 *       200:
 *         description: O post foi retornado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Post'
 *       404:
 *         description: Post não encontrado.
 */

/**
 * @swagger
 * /posts/search/:
 *   get:
 *     summary: Pesquisa posts
 *     tags: [Posts]
 *     parameters:
 *       - in: query
 *         name: qs
 *         schema:
 *           type: string
 *         required: false
 *         description: Título ou parte do título do post a ser pesquisado
 *     responses:
 *       200:
 *         description: Lista de posts correspondentes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Post'
 *       404:
 *         description: Nenhum post encontrado.
 */

router.get("/search", searchPosts);
router.get("/", getPosts);
router.get("/:id", getPost);
router.post("/", createPost);
router.put("/:id", updatePost);
router.delete("/:id", deletePost);

module.exports = router;
