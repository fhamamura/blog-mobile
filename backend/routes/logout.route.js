const express = require("express");
const router = express.Router();
const { logout } = require("../controllers/logout.controller.js");

/**
 * @swagger
 * /logout:
 *   get:
 *     summary: Realiza logout
 *     tags: [Logout]
 *     responses:
 *       200:
 *         description: Logoff realizado com sucesso.
 *       500:
 *         description: Erro no servidor.
 *
 */

router.get("/", logout);

module.exports = router;
