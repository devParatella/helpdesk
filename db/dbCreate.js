class HelpdeskDatabase {
  initConnection(connection) {
    this.connection = connection;
    this.initDatabase();
  }

  initDatabase() {
    this.connection.connect((error) => {
      if (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
        return;
      }
      console.log("Conexão bem-sucedida ao banco de dados...");
      this.createDatabase();
    });
  }

  createDatabase() {
    const sql = "CREATE DATABASE IF NOT EXISTS helpdesk";

    this.connection.query(sql, (error) => {
      if (error) {
        console.error("Erro ao criar o banco de dados:", error.message);
        return;
      }
      console.log("Banco de dados criado com sucesso...");
      this.useDatabase();
    });
  }

  useDatabase() {
    const sql = "USE helpdesk";

    this.connection.query(sql, (error) => {
      if (error) {
        console.error("Erro ao selecionar o banco de dados:", error.message);
        return;
      }
      console.log("Banco de dados selecionado com sucesso...");
      this.createTable();
    });
  }

  createTable() {
    const sql = `
    CREATE TABLE IF NOT EXISTS chamados (
        id INT AUTO_INCREMENT PRIMARY KEY,
        data_hora_abertura CHAR(19),
        nome_solicitante VARCHAR(100) NOT NULL,
        contato_solicitante VARCHAR(100) NOT NULL,
        departamento ENUM('Comercial', 'Marketing', 'Financeiro', 'Compras', 'Recursos humanos', 'Operações') DEFAULT 'Financeiro',
        prioridade ENUM('Baixa', 'Média', 'Alta') DEFAULT 'Baixa',
        descricao_problema TEXT NOT NULL,
        comentarios_solicitante VARCHAR(100) DEFAULT 'Não houve comentários',
        anexos VARCHAR(255) DEFAULT 'Não houve anexos',
        notas_internas VARCHAR(100) DEFAULT 'Sem notas internas',
        responsavel_chamado VARCHAR(100) NOT NULL,
        estado ENUM('Aberto', 'Em andamento', 'Aguardando resposta', 'Fechado') DEFAULT 'Aberto',
        data_hora_resolucao DATETIME

    )`;

    this.connection.query(sql, (error) => {
      if (error) {
        console.error("Erro ao criar a tabela de chamados:", error.message);
        return;
      }
      console.log("Tabela de chamados criada com sucesso...");
    });
  }
}

module.exports = new HelpdeskDatabase();
