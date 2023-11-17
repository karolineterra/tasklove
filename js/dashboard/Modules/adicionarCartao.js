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
                <button type="submit">Adicionar Cartão</button>
              `;

        tasksSpace.appendChild(formulario);

        formulario.addEventListener("submit", function (event) {
          event.preventDefault();

          const nome = this.querySelector('[name="nome"]').value;
          const descricao = this.querySelector('[name="descricao"]').value;
          const prazo = this.querySelector('[name="prazo"]').value;

          const novoCartao = criarCartao(nome, descricao, prazo);

          tasksSpace.insertBefore(novoCartao, formulario);

          tasksSpace.removeChild(formulario);
        });
      });
    });

    function criarCartao(nome, descricao, prazo) {
      const cartao = document.createElement("div");
      cartao.classList.add("task");

      const prazoFormatado = formatarData(prazo);

      cartao.innerHTML = `
              <h2>${nome}</h2>
              <p>${descricao}</p>
              <div class="statusDatas">
                <div class="status${
                  checarAtrasado(prazo) ? " atrasado" : ""
                }"></div>
                <span class="dataEntrega">${prazoFormatado}</span>
              </div>
            `;

      cartao.draggable = true;

      cartao.addEventListener("dragstart", function (event) {
        event.dataTransfer.setData("text/plain", cartao.id);
      });

      return cartao;
    }

    const quadros = document.querySelectorAll(".quadro");
    quadros.forEach((quadro) => {
      quadro.addEventListener("dragover", function (event) {
        event.preventDefault();
      });

      quadro.addEventListener("drop", function (event) {
        event.preventDefault();
        const cartaoId = event.dataTransfer.getData("text/plain");
        const cartao = document.getElementById(cartaoId);

        this.querySelector(".tasksSpace").appendChild(cartao);
      });

      const exclusao = document.createElement("div");
      exclusao.classList.add("exclusao");
      exclusao.innerHTML = "X";
      quadro.appendChild(exclusao);

      exclusao.addEventListener("dragover", function (event) {
        event.preventDefault();
        this.classList.add("hovered");
      });

      exclusao.addEventListener("dragleave", function () {
        this.classList.remove("hovered");
      });

      exclusao.addEventListener("drop", function (event) {
        event.preventDefault();
        this.classList.remove("hovered");

        const cartaoId = event.dataTransfer.getData("text/plain");

        const cartao = document.getElementById(cartaoId);

        if (cartao && cartao.parentNode) {
          cartao.parentNode.removeChild(cartao);
        }
      });
    });

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

      mes = mes < 10 ? `0${mes}` : mes;
      dia = dia < 10 ? `0${dia}` : dia;

      return `${ano}-${mes}-${dia}`;
    }
  });
}
