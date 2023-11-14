export default function initCoresPadrao() {
  const corFundoSelecionada = localStorage.getItem("corFundoSelecionada");
  const corFonteSelecionada = localStorage.getItem("corFonteSelecionada");

  const corPadrao = document.querySelectorAll(".corPadrao");
  const corFontePadrao = document.querySelectorAll(".corFontePadrao");

  corPadrao.forEach((item) => {
    item.style.backgroundColor = corFundoSelecionada;
  });
  corFontePadrao.forEach((item) => {
    item.style.color = corFonteSelecionada;
  });
}
