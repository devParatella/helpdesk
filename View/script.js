document.addEventListener("DOMContentLoaded", function () {
  const obterTodosChamadosBtn = document.getElementById(
    "obterTodosChamadosBtn"
  );
  const criarChamadoBtn = document.getElementById("criarChamadoBtn");
  const atualizarChamadoBtn = document.getElementById("atualizarChamadoBtn");

  if (obterTodosChamadosBtn) {
    obterTodosChamadosBtn.addEventListener("click", obterTodosChamados);
  }
  if (criarChamadoBtn) {
    criarChamadoBtn.addEventListener("click", criarChamado);
  }
  if (atualizarChamadoBtn) {
    atualizarChamadoBtn.addEventListener("click", atualizarChamado);
  }
});

async function obterTodosChamados() {
  try {
    const response = await fetch("http://localhost:3000/chamados");
    if (!response.ok) {
      throw new Error("Não foi possível obter os chamados.");
    }
    const data = await response.json();
    atualizarTabelaChamados(data);
    console.log("Todos os chamados:", data);
  } catch (error) {
    console.error("Erro:", error);
  }
}

async function criarChamado() {
  const nomeSolicitante = document.getElementById("nomeSolicitante").value;
  const contatoSolicitante =
    document.getElementById("contatoSolicitante").value;
  const departamento = document.getElementById("departamento").value;
  const prioridade = document.getElementById("prioridade").value;
  const descricaoProblema = document.getElementById("descricaoProblema").value;
  const comentariosSolicitante = document.getElementById(
    "comentariosSolicitante"
  ).value;
  const anexos = document.getElementById("anexos").value;
  const notasInternas = document.getElementById("notasInternas").value;
  const responsavelChamado =
    document.getElementById("responsavelChamado").value;

  const novoChamado = {
    nome_solicitante: nomeSolicitante,
    contato_solicitante: contatoSolicitante,
    descricao_problema: descricaoProblema,
    departamento: departamento,
    prioridade: prioridade,
    comentarios_solicitante: comentariosSolicitante,
    anexos: anexos,
    notas_internas: notasInternas,
    responsavel_chamado: responsavelChamado,
  };

  try {
    const response = await fetch("http://localhost:3000/chamados", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(novoChamado),
    });
    if (!response.ok) {
      throw new Error("Não foi possível criar a Chamado.");
    }

    console.log("Resposta da API:", response);

    if (response.body && response.body.getReader) {
      const reader = response.body.getReader();
      const { value, done } = await reader.read();
      if (!done && value) {
        const responseText = new TextDecoder("utf-8").decode(value);
        console.log("Corpo da resposta:", responseText);
      }
    }

    obterTodosChamados();
  } catch (error) {
    console.error("Erro:", error);
  }
}

function atualizarTabelaChamados(chamados) {
  const corpoTabela = document.getElementById("corpoTabelaChamados");
  corpoTabela.innerHTML = "";

  chamados.forEach((chamado) => {
    const novaLinha = `
          <tr class="${chamado.id % 2 === 0 ? "linha-par" : "linha-impar"}">
              <td>${chamado.id}</td>
              <td>${chamado.data_hora_abertura}</td>
              <td>${chamado.nome_solicitante}</td>
              <td>${chamado.contato_solicitante}</td>
              <td>${chamado.departamento}</td>
              <td>${chamado.prioridade}</td>
              <td>${chamado.descricao_problema}</td>
              <td>${chamado.comentarios_solicitante}</td>
              <td>${chamado.anexos}</td>
              <td>${chamado.notas_internas}</td>
              <td>${chamado.responsavel_chamado}</td>
              <td>${chamado.estado}</td>
              <td>${chamado.data_hora_resolucao}</td>
          </tr>
  `;

    corpoTabela.insertAdjacentHTML("beforeend", novaLinha);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const btnAbrirChamado = document.getElementById("abrirChamado");
  const secaoNovoChamado = document.getElementById("novo-chamado");

  btnAbrirChamado.addEventListener("click", function () {
    if (secaoNovoChamado.style.display === "none") {
      secaoNovoChamado.style.display = "block";
    } else {
      secaoNovoChamado.style.display = "none";
    }
  });
});

async function pesquisarChamados() {
  const tipoPesquisa = document.getElementById("tipoPesquisa").value;
  const termo = document.getElementById("barraPesquisa").value;

  if (!termo.trim()) {
    await obterTodosChamados();
  } else {
    try {
      const response = await fetch(
        `http://localhost:3000/chamados/pesquisar?tipo=${tipoPesquisa}&termo=${termo}`
      );
      if (!response.ok) {
        throw new Error("Não foi possível obter os chamados.");
      }
      const data = await response.json();
      atualizarTabelaChamados(data);
      console.log("Chamados encontrados:", data);
    } catch (error) {
      console.error("Erro:", error);
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const btnPesquisarChamados = document.getElementById("pesquisarChamadosBtn");

  if (btnPesquisarChamados) {
    btnPesquisarChamados.addEventListener("click", function () {
      pesquisarChamados();
    });
  }
});
