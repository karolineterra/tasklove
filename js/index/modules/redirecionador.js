export default function initRedirecionador() {
  const botaoConfirmar = document.querySelector(".modal-botao-confirmar");

  botaoConfirmar.addEventListener("click", () => {
    window.location.href = ".././dashboard.html";
  });
}
