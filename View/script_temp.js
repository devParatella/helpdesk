/*
async function obterChamadoPorId() {
  const id = document.getElementById("idChamado").value;
  try {
    const response = await fetch(`/Chamados/${id}`);
    if (!response.ok) {
      throw new Error(`Não foi possível obter a Chamado: ${id}`);
    }
    const Chamado = await response.json();
    atualizarTabelaChamados([Chamado]); // Atualizar a tabela com a Chamado encontrada
    console.log("Chamado:", Chamado);
  } catch (error) {
    console.error("Erro:", error);
  }
}
*/

/*
async function atualizarChamado() {
  const id = document.getElementById("idChamadoAtualizar").value;
  const titulo = document.getElementById("tituloAtualizar").value;
  const descricao = document.getElementById("descricaoAtualizar").value;
  const atualizaChamado = { titulo, descricao };

  try {
    const response = await fetch(`/Chamados/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(atualizaChamado),
    });
    if (!response.ok) {
      throw new Error(`Não foi possível atualizar a Chamado ${id}.`);
    }
    const data = await response.json();
    console.log("Chamado atualizada:", data);
    // Atualizar a tabela de Chamados após atualizar a Chamado
    obterTodosChamados();
  } catch (error) {
    console.error("Erro:", error);
  }
}

async function deletarChamado() {
  const id = document.getElementById("idChamadoDeletar").value;
  try {
    const response = await fetch(`/Chamados/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      throw new Error(`Não foi possível deletar a Chamado ${id}`);
    }
    console.log("Chamado deletada com sucesso.");
    // Atualizar a tabela de Chamados após deletar a Chamado
    obterTodosChamados();
  } catch (error) {
    console.error("Erro:", error);
  }
}
*/
/*document.addEventListener("DOMContentLoaded", function () {
  const btnobterTodosChamados = document.getElementById(
    "obterTodosChamadosBtn"
  );
  const secaoTodosChamados = document.getElementById("listar-chamados");

  btnobterTodosChamados.addEventListener("click", function () {
    if (secaoTodosChamados.style.display === "none") {
      secaoTodosChamados.style.display = "block";
    } else {
      secaoTodosChamados.style.display = "none";
    }
  });
});
*/