export default function adicionarCartao() {
  document.addEventListener("DOMContentLoaded", function () {
    const adicionarCardBotoes = document.querySelectorAll(".adicionarCard");

    adicionarCardBotoes.forEach((botao) => {
      botao.addEventListener("click", function () {
        const quadro = this.closest(".quadro");
        const tasksSpace = quadro.querySelector(".tasksSpace");

        // Cria um formulário para o novo cartão
        const formulario = document.createElement("form");
        formulario.innerHTML = `
            <input type="text" name="nome" placeholder="Nome do Cartão" required />
            <textarea name="descricao" placeholder="Descrição do Cartão" required></textarea>
            <label for="prazo">Prazo de Entrega</label>
            <input type="date" name="prazo" min="${getMinDate()}" required />
            <button type="submit">Adicionar Cartão</button>
          `;

        // Adiciona o formulário ao quadro
        tasksSpace.appendChild(formulario);

        // Adiciona um ouvinte de evento para o envio do formulário
        formulario.addEventListener("submit", function (event) {
          event.preventDefault();

          // Recupera os valores do formulário
          const nome = this.querySelector('[name="nome"]').value;
          const descricao = this.querySelector('[name="descricao"]').value;
          const prazo = this.querySelector('[name="prazo"]').value;

          // Cria um novo cartão com os valores do formulário
          const novoCartao = criarCartao(nome, descricao, prazo);

          // Adiciona o novo cartão à lista de tarefas
          tasksSpace.insertBefore(novoCartao, formulario);
          contarTarefas();

          // Remove o formulário
          tasksSpace.removeChild(formulario);
        });
      });
    });

    function criarCartao(nome, descricao, prazo) {
      const cartao = document.createElement("div");
      cartao.classList.add("task");

      // Formata a data do prazo
      const prazoFormatado = formatarData(prazo);

      // Adiciona conteúdo ao cartão com base nos valores fornecidos
      cartao.innerHTML = `
          <h2>${nome}</h2>
          <p>${descricao}</p>
          <div class="statusDatas">
            <div class="status ${
              checarAtrasado(prazo) ? " atrasado" : ""
            }"></div>
            <span class="dataEntrega">${prazoFormatado}</span>
          </div>
        `;

      // Torna o cartão arrastável
      cartao.draggable = true;

      // Adiciona um ouvinte de evento para o início do arrastar
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

      const quadros = document.querySelectorAll(".quadro");
      let draggedCard = null;

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
      const options = { day: "2-digit", month: "2-digit", year: "2-digit" };
      const dataObj = new Date(data);
      return new Intl.DateTimeFormat("pt-BR", options).format(dataObj);
    }

    function checarAtrasado(prazo) {
      const dataAtual = new Date();
      const dataPrazo = new Date(prazo);
      return dataPrazo < dataAtual;
    }

    function getMinDate() {
      const hoje = new Date();
      const ano = hoje.getFullYear();
      let mes = hoje.getMonth() + 1;
      let dia = hoje.getDate();

      // Adiciona um zero à frente do mês ou dia se for menor que 10
      mes = mes < 10 ? `0${mes}` : mes;
      dia = dia < 10 ? `0${dia}` : dia;

      return `${ano}-${mes}-${dia}`;
    }
  });
}
