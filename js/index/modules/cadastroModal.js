export default function initCadastroModal() {
  const modal = document.querySelector("#modal");
  const closeBotao = document.querySelector(".close");

  function fecharModal() {
    modal.style.display = "none";
  }

  function abrirModal() {
    modal.style.display = "flex";
  }

  closeBotao.addEventListener("click", fecharModal);

  return {
    abrirModal,
    fecharModal,
  };
}
