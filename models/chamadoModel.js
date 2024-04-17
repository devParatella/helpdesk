const dbConnection = require("../db/dbConnection");
const moment = require("moment-timezone");

class ChamadoModel {
  async executeSQL(sql, parametros = []) {
    return new Promise((resolve, reject) => {
      dbConnection.query(sql, parametros, (error, result) => {
        if (error) {
          return reject(error);
        }
        return resolve(result);
      });
    });
  }

  async buscarTodosChamados() {
    const sql = "SELECT * FROM chamados";
    return this.executeSQL(sql);
  }

  async buscarchamadoPorId(id) {
    const sql = "SELECT * FROM chamados WHERE id = ?";
    return this.executeSQL(sql, [id]);
  }

  async pesquisarChamados(filtro) {
    const { tipo, termo } = filtro;
    let query = `
      SELECT *
      FROM chamados
      WHERE `;
    let parametros;

    switch (tipo) {
      case "nome_solicitante":
        query += `nome_solicitante LIKE ?`;
        parametros = [`%${termo}%`];
        break;
      case "departamento":
        query += `departamento LIKE ?`;
        parametros = [`%${termo}%`];
        break;
      case "prioridade":
        query += `prioridade LIKE ?`;
        parametros = [`%${termo}%`];
        break;
      case "responsavel_chamado":
        query += `responsavel_chamado LIKE ?`;
        parametros = [`%${termo}%`];
        break;
      default:
        throw new Error("Tipo de pesquisa inválido.");
    }

    try {
      const results = await this.executeSQL(query, parametros);
      return results;
    } catch (error) {
      throw new Error("Erro ao pesquisar chamados no banco de dados.");
    }
  }

  async criarChamado(novoChamado) {
    const sql = "INSERT INTO chamados SET ?";
    
    const agora = new Date();
    console.log("agora", agora);
    const agoraSP = moment.tz(agora, "America/Sao_Paulo");
    console.log("agoraSP", agoraSP);
    const dataHoraBrasil = agoraSP.format("DD-MM-YYYY" + " " + "HH:mm:ss");
    console.log("dataHoraBrasil", dataHoraBrasil);
    novoChamado.data_hora_abertura = dataHoraBrasil;

    return this.executeSQL(sql, novoChamado);
  }

  
  async atualizarChamado(atualizaChamado, id) {
    const sql = "UPDATE chamados SET ? WHERE id = ?";
    const valores = [];
    return this.executeSQL(sql, [atualizaChamado, id]);
  }

  async deletarChamado(id) {
    const sql = "DELETE FROM chamados WHERE id = ?";
    return this.executeSQL(sql, [id]);
  }
}

module.exports = new ChamadoModel();
