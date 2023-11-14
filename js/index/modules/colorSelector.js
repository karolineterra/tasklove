export default function initColorSelector() {
  document.addEventListener("DOMContentLoaded", function () {
    // Recupera a cor do localStorage para o fundo, se existir
    let corFundoSalva = localStorage.getItem("corFundoSelecionada");
    const corPadrao = document.querySelector(".corPadrao");
    const corInput = document.getElementById("corInput");
    const corFontePadrao = document.querySelector(".corFontePadrao");
    const corFonte = document.getElementById("corFonte");

    // Aplica a cor do fundo salva ou usa uma cor padrão
    if (corFundoSalva) {
      corPadrao.style.backgroundColor = corFundoSalva;
      corInput.value = corFundoSalva;
    } else {
      // Cor padrão
      corPadrao.style.backgroundColor = "#ff0000";
    }

    // Recupera a cor do localStorage para a fonte, se existir
    let corFonteSalva = localStorage.getItem("corFonteSelecionada");

    // Aplica a cor da fonte salva ou usa uma cor padrão
    if (corFonteSalva) {
      corFontePadrao.style.color = corFonteSalva;
      corFonte.value = corFonteSalva;
    } else {
      // Cor padrão
      corFontePadrao.style.color = "#000000";
    }

    // Adiciona um ouvinte de evento para o input de cor de fundo
    document;
    corInput.addEventListener("input", function (event) {
      // Obtém a cor de fundo selecionada
      let corFundoSelecionada = event.target.value;

      // Aplica a cor de fundo aos elementos na página
      corPadrao.style.backgroundColor = corFundoSelecionada;

      // Salva a cor de fundo no localStorage para persistência
      localStorage.setItem("corFundoSelecionada", corFundoSelecionada);
    });

    // Adiciona um ouvinte de evento para o seletor de cor de fonte
    corFonte.addEventListener("change", function () {
      // Obtém a cor da fonte selecionada
      let corFonteSelecionada = this.value;

      // Aplica a cor da fonte ao texto na página
      corFontePadrao.style.color = corFonteSelecionada;

      // Salva a cor da fonte no localStorage para persistência
      localStorage.setItem("corFonteSelecionada", corFonteSelecionada);
    });
  });
}
