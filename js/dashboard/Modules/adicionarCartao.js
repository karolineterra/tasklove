export default function adicionarCartao() {
  document.addEventListener("DOMContentLoaded", function () {
    const adicionarCardBotoes = document.querySelectorAll(".adicionarCard");

    adicionarCardBotoes.forEach((botao) => {
      botao.addEventListener("click", function () {
        const quadro = this.closest(".quadro");
        const tasksSpace = quadro.querySelector(".tasksSpace");

        const formulario = document.createElement("form");
        formulario.innerHTML = `
          <input type="text" name="nome" placeholder="Nome do Cartão" required />
          <textarea name="descricao" placeholder="Descrição do Cartão" required></textarea>
          <label for="prazo">Prazo de Entrega</label>
          <input type="date" name="prazo" min="${getMinDate()}" required />
          <div class="containerFormButtons">
            <button type="submit">Adicionar Cartão</button>
            <button type="button" class="cancelarAdicao">Cancelar</button>
          </div>
        `;

        tasksSpace.appendChild(formulario);

        const cancelarAdicaoBotao = formulario.querySelector(".cancelarAdicao");
        cancelarAdicaoBotao.addEventListener("click", function () {
          tasksSpace.removeChild(formulario);
        });

        formulario.addEventListener("submit", function (event) {
          event.preventDefault();

          const nome = this.querySelector('[name="nome"]').value;
          const descricao = this.querySelector('[name="descricao"]').value;
          const prazo = this.querySelector('[name="prazo"]').value;

          const novoCartao = criarCartao(nome, descricao, prazo);

          tasksSpace.insertBefore(novoCartao, formulario);
          contarTarefas();

          tasksSpace.removeChild(formulario);
        });
      });
    });

    function criarCartao(nome, descricao, prazo) {
      const cartao = document.createElement("div");
      cartao.classList.add("task");

      const prazoFormatado = formatarData(prazo);
      const quadros = document.querySelectorAll(".quadro");
      let draggedCard = null;

      cartao.innerHTML = `
          <h2>${nome}</h2>
          <p>${descricao}</p>
          <div class="statusDatas">
            <div class="status ${
              checarAtrasado(prazo) ? " atrasado" : ""
            }"></div>
            <span class="dataEntrega">${prazoFormatado}</span>
          </div>
          <div class="botoesCartao">
          <button class="editarCartao"><img src="./img/icon-editar-texto-branco.png"></button>
          <button class="excluirCartao"><img src="./img/icon-excluir-branco.png"></button>
        </div>
        `;

      cartao.draggable = true;
      cartao.addEventListener("dragstart", function () {
        draggedCard = this;
        setTimeout(() => {
          this.style.display = "none";
        }, 0);
      });

      cartao.addEventListener("dragend", function () {
        setTimeout(() => {
          this.style.display = "flex";
          draggedCard = null;
        }, 0);
      });

      quadros.forEach((quadro) => {
        quadro.addEventListener("dragover", function (e) {
          e.preventDefault();
        });

        quadro.addEventListener("drop", function () {
          if (draggedCard) {
            this.querySelector(".tasksSpace").appendChild(draggedCard);
            contarTarefas();
          }
        });
      });

      const editarBotao = cartao.querySelector(".editarCartao");
      editarBotao.addEventListener("click", function () {
        editarCartao(cartao);
      });

      const excluirBotao = cartao.querySelector(".excluirCartao");
      excluirBotao.addEventListener("click", function () {
        excluirCartao(cartao);
      });

      return cartao;
    }

    function contarTarefas() {
      const quadroTodoTasks = document.querySelectorAll(".quadroTodo .task");
      const todoTotal = document.querySelector(".todoTotal");

      const quadroProgressTasks = document.querySelectorAll(
        ".quadroProgress .task"
      );
      const progressTotal = document.querySelector(".progressTotal");
      console.log(progressTotal);
      const quadroDoneTasks = document.querySelectorAll(".quadroDone .task");
      const doneTotal = document.querySelector(".doneTotal");

      console.log(doneTotal);

      let todoContador = 0;
      let progressContador = 0;
      let doneContador = 0;

      quadroTodoTasks.forEach(() => {
        todoContador += 1;
      });
      todoTotal.innerText = todoContador;

      quadroProgressTasks.forEach(() => {
        progressContador += 1;
      });
      progressTotal.innerText = progressContador;

      quadroDoneTasks.forEach(() => {
        doneContador += 1;
      });
      doneTotal.innerText = doneContador;
    }

    function formatarData(data) {
      const [ano, mes, dia] = data.split("-");
      const dataObj = new Date(ano, mes - 1, dia);

      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      return new Intl.DateTimeFormat("pt-BR", options).format(dataObj);
    }

    function checarAtrasado(prazo) {
      const dataAtual = new Date();
      const dataPrazo = new Date(prazo);
      return dataPrazo < dataAtual;
    }

    function getMinDate() {
      const hoje = new Date();
      const ano = hoje.getUTCFullYear();
      let mes = hoje.getUTCMonth() + 1; // Meses são zero indexados
      let dia = hoje.getUTCDate();

      // Adiciona um zero à frente do mês ou dia se for menor que 10
      mes = mes < 10 ? `0${mes}` : mes;
      dia = dia < 10 ? `0${dia}` : dia;

      return `${ano}-${mes}-${dia}`;
    }

    // ... (seu código existente)

    function editarCartao(cartao) {
      const quadro = cartao.closest(".quadro");
      const tasksSpace = quadro.querySelector(".tasksSpace");

      // Adiciona uma classe para tornar o cartão invisível
      cartao.classList.add("invisivel");

      // Cria um formulário de edição preenchido com os detalhes do cartão
      const formularioEdicao = document.createElement("form");
      formularioEdicao.innerHTML = `
    <input type="text" name="nome" value="${
      cartao.querySelector("h2").innerText
    }" required />
    <textarea name="descricao" required>${
      cartao.querySelector("p").innerText
    }</textarea>
    <label for="prazo">Prazo de Entrega</label>
    <input type="date" name="prazo" min="${getMinDate()}" value="${
        cartao.querySelector(".dataEntrega").innerText
      }" required />
    <button type="submit">Salvar</button>
    <button type="button" class="cancelarEdicao">Cancelar</button>
  `;

      // Adiciona o formulário de edição ao quadro
      tasksSpace.insertBefore(formularioEdicao, cartao);

      // Adiciona um ouvinte de evento para o envio do formulário de edição
      formularioEdicao.addEventListener("submit", function (event) {
        event.preventDefault();

        // Recupera os valores do formulário de edição
        const nome = this.querySelector('[name="nome"]').value;
        const descricao = this.querySelector('[name="descricao"]').value;
        const prazo = this.querySelector('[name="prazo"]').value;
        // Atualiza os detalhes do cartão
        cartao.querySelector("h2").innerText = nome;
        cartao.querySelector("p").innerText = descricao;
        cartao.querySelector(".dataEntrega").innerText = formatarData(prazo);

        // Remove a classe que torna o cartão invisível
        cartao.classList.remove("invisivel");

        // Remove o formulário de edição
        tasksSpace.removeChild(formularioEdicao);
      });

      // Adiciona um ouvinte de evento para o botão de cancelar edição
      const cancelarEdicaoBotao =
        formularioEdicao.querySelector(".cancelarEdicao");
      cancelarEdicaoBotao.addEventListener("click", function () {
        // Remove a classe que torna o cartão invisível
        cartao.classList.remove("invisivel");

        // Remove o formulário de edição ao cancelar
        tasksSpace.removeChild(formularioEdicao);
      });
    }

    // ... (seu código existente)

    function excluirCartao(cartao) {
      const quadro = cartao.closest(".quadro");
      const tasksSpace = quadro.querySelector(".tasksSpace");

      tasksSpace.removeChild(cartao);

      contarTarefas();
    }
  });
}
