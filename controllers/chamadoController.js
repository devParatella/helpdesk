const chamadoModel = require("../models/chamadoModel");

class ChamadoController {
  viewRead(req, res) {
    return res.status(200).render("./index", { title: "HelpDesk" });
  }

  viewCreate(req, res) {
    return res
      .status(200)
      .render("./chamado/chamado_create", { title: "Abrir novo chamado" });
  }

  async viewUpdate(req, res) {
    const { id } = req.params;
    const chamado = chamadoModel.read(id);
    try {
      const result = await chamado;
      return result.length == 0
        ? res.status(404).redirect("/")
        : res.status(200).render("./chamado/chamado_update", {
            title: "Atualizar chamado",
            chamados: result,
          });
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  async listarTodosChamados(req, res) {
    const chamados = await chamadoModel.buscarTodosChamados();
    try {
      const resultado_1 = await chamados;
      return resultado_1.length == 0
        ? res.status(404).render(".chamado/chamado_read", {
            title: "Chamados",
            chamados: resultado_1,
          })
        : res.status(200).render(".chamado/chamado_read", {
            title: "Chamados",
            chamados: resultado_1,
          });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async buscarChamado(req, res) {
    const { id } = req.params;
    const chamado = chamadoModel.buscarchamadoPorId(id);
    try {
      const result = await chamado;
      return result.length == 0
        ? res.status(404).render(".chamado/chamado_read", {
            title: "Chamados",
            chamados: result,
          })
        : res.status(200).render(".chamado/chamado_read", {
            title: "Chamados",
            chamados: result,
          });
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async criarChamado(req, res) {
    const novoChamado = req.body;
    const chamado = chamadoModel.criarChamado(novoChamado);
    try {
      const result = await chamado;
      return res
        .status(200)
        .send(
          "<script> alert('Chamado aberto com sucesso!'); window.location='/chamado' </script>"
        );
    } catch (error) {
      console.error("Erro ao criar chamado:", error);
      res
        .status(500)
        .send("Erro ao criar chamado. Por favor, tente novamente mais tarde.");
    }
  }

  async atualizarChamado(req, res) {
    const { id } = req.params;
    const chamadoAtualizado = req.body;
    const chamado = chamadoModel.atualizarChamado(chamadoAtualizado, id);
    try {
      const result = await chamado;
      res.status(200)
      .send(
        "<script> alert('Chamado atualizado com sucesso!'); window.location='/chamado' </script>"
      );
    } catch (error) {
      return res.status(400).send(error.message);
    }
  }

  async deletarChamado(req, res) {
    const { id } = req.params;
    try {
      await chamadoModel.deletarChamado(id);
      res.status(200).send("Chamado deletado com sucesso!");
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async pesquisarChamados(req, res) {
    const { tipo, termo } = req.query;
    let chamados;

    try {
      switch (tipo) {
        case "nome_solicitante":
          chamados = await Chamado.find({
            nome_solicitante: { $regex: termo, $options: "i" },
          });
          break;
        case "departamento":
          chamados = await Chamado.find({
            departamento: { $regex: termo, $options: "i" },
          });
          break;
        case "prioridade":
          chamados = await Chamado.find({
            prioridade: { $regex: termo, $options: "i" },
          });
          break;
        case "responsavel_chamado":
          chamados = await Chamado.find({
            responsavel_chamado: { $regex: termo, $options: "i" },
          });
          break;
        default:
          chamados = [];
      }

      res.json(chamados);
    } catch (error) {
      console.error("Erro ao pesquisar chamados:", error);
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  }
}

module.exports = new ChamadoController();
