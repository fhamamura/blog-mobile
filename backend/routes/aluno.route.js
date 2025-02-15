const express = require("express");
const Aluno = require("../models/user.model.js");
const router = express.Router();
const {
	getAlunos,
	getAluno,
	createAlunos,
	updateAluno,
	deleteAluno,
} = require("../controllers/aluno.controller.js");
//console.log(">>aluno.route");

/**
 * @swagger
 * components:
 *   schemas:
 *     Aluno:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: O ID gerado automaticamente.
 *         name:
 *           type: string
 *           description: O nome do Aluno.
 *         email:
 *           type: string
 *           unique: O email deve ser único.
 *           description: O email do Aluno.
 *         password:
 *           type: string
 *           description: A senha do Aluno.
 *       example:
 *         name: "Aluno Fulano"
 *         email: "email@email.org.br"
 *         password: "senha123"
 */

/**
 * @swagger
 * tags:
 *  name: Alunos
 *  description: API para gerenciamento de Alunos
 */

/**
 * @swagger
 * /alunos:
 *   get:
 *     summary: Retorna todos os alunos
 *     tags: [Alunos]
 *     responses:
 *       200:
 *         description: Lista de todos os alunos.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Aluno'
 */

/**
 * @swagger
 * /alunos/{id}:
 *  get:
 *   summary: Retorna um aluno específico
 *   tags: [Alunos]
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID do aluno
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: Aluno encontrado
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     404:
 *       description: Aluno não encontrado
 */

/**
 * @swagger
 * /alunos:
 *  post:
 *
 *   summary: Cria um novo aluno
 *   tags: [Alunos]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Aluno'
 *   responses:
 *     201:
 *       description: Aluno criado com sucesso
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     500:
 *       description: Erro do servidor
 */

/**
 * @swagger
 * /alunos/{id}:
 *  put:
 *   summary: Atualiza um aluno existente
 *   tags: [Alunos]
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID do aluno
 *       schema:
 *         type: string
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Aluno'
 *   responses:
 *     200:
 *       description: Aluno atualizado com sucesso
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Aluno'
 *     404:
 *       description: Aluno não encontrado
 *     500:
 *       description: Erro do servidor
 */

/**
 * @swagger
 * /alunos/{id}:
 *  delete:
 *   summary: Exclui um aluno
 *   tags: [Alunos]
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID do aluno
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: Aluno deletado com sucesso
 *     404:
 *       description: Aluno não encontrado
 *     500:
 *       description: Erro do servidor
 */

router.get("/", getAlunos);
router.get("/:id", getAluno);
router.post("/", createAlunos);
router.put("/:id", updateAluno);
router.delete("/:id", deleteAluno);

module.exports = router;
