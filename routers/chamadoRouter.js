const express = require("express");
const router = express.Router();
const chamadoController = require("../controllers/chamadoController");

router.get("/chamados/create", chamadoController.viewCreate);
router.post("/chamados", chamadoController.criarChamado);
router.get("/", chamadoController.viewRead);
router.get("/chamados", chamadoController.listarTodosChamados);
router.get("/chamados/:id", chamadoController.buscarChamado);
router.get("/chamados/update/:id", chamadoController.viewUpdate);
router.put("/chamados/:id", chamadoController.atualizarChamado);
router.get("/chamados/delete/:id", chamadoController.deletarChamado);
router.delete("/chamados/:id", chamadoController.deletarChamado);
router.get("/chamados/pesquisar", chamadoController.pesquisarChamados);

module.exports = router;
