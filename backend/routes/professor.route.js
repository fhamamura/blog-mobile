const express = require("express");
const Professor = require("../models/user.model.js");
const router = express.Router();
const {
	getProfessores,
	getProfessor,
	createProfessores,
	updateProfessor,
	deleteProfessor,
} = require("../controllers/professor.controller.js");
//console.log(">>professor.route");

/**
 * @swagger
 * components:
 *   schemas:
 *     Professor:
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
 *           description: O nome do professor.
 *         email:
 *           type: string
 *           unique: O email deve ser único.
 *           description: O email do professor.
 *         password:
 *           type: string
 *           description: A senha do professor.
 *       example:
 *         name: "Professor Fulano"
 *         email: "email@email.org.br"
 *         password: "senha123"
 */

/**
 * @swagger
 * tags:
 *  name: Professores
 *  description: API para gerenciamento de professores
 */

/**
 * @swagger
 * /professores:
 *   get:
 *     summary: Retorna todos os professores
 *     tags: [Professores]
 *     responses:
 *       200:
 *         description: Lista de todos os professores.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Professor'
 */

/**
 * @swagger
 * /professores/{id}:
 *  get:
 *   summary: Retorna um professor específico
 *   tags: [Professores]
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID do professor
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: Professor encontrado
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Professor'
 *     404:
 *       description: Professor não encontrado
 */

/**
 * @swagger
 * /professores:
 *  post:
 *
 *   summary: Cria um novo professor
 *   tags: [Professores]
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Professor'
 *   responses:
 *     201:
 *       description: Professor criado com sucesso
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Professor'
 *     500:
 *       description: Erro do servidor
 */

/**
 * @swagger
 * /professores/{id}:
 *  put:
 *   summary: Atualiza um professor existente
 *   tags: [Professores]
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID do professor
 *       schema:
 *         type: string
 *   requestBody:
 *     required: true
 *     content:
 *       application/json:
 *         schema:
 *           $ref: '#/components/schemas/Professor'
 *   responses:
 *     200:
 *       description: Professor atualizado com sucesso
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Professor'
 *     404:
 *       description: Professor não encontrado
 *     500:
 *       description: Erro do servidor
 */

/**
 * @swagger
 * /professores/{id}:
 *  delete:
 *   summary: Exclui um professor
 *   tags: [Professores]
 *   parameters:
 *     - in: path
 *       name: id
 *       required: true
 *       description: ID do professor
 *       schema:
 *         type: string
 *   responses:
 *     200:
 *       description: Professor deletado com sucesso
 *     404:
 *       description: Professor não encontrado
 *     500:
 *       description: Erro do servidor
 */

router.get("/", getProfessores);
router.get("/:id", getProfessor);
router.post("/", createProfessores);
router.put("/:id", updateProfessor);
router.delete("/:id", deleteProfessor);

module.exports = router;
