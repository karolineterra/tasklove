import initColorSelector from "./modules/colorSelector.js";
import initCadastroModal from "./modules/cadastroModal.js";
import initRedirecionador from "./modules/redirecionador.js";
import validarCadastro from "./modules/validarCadastro.js";

initColorSelector();
const cadastroModal = initCadastroModal();

document.addEventListener("DOMContentLoaded", function () {
  document
    .getElementById("btnCadastrar")
    .addEventListener("click", function () {
      const isValid = validarCadastro();

      if (isValid) {
        cadastroModal.abrirModal();
      }
    });
});

initRedirecionador();
