// script.js
import initColorSelector from "./index/modules/colorSelector.js.js";
import initCadastroModal from "./modules/cadastroModal.js";
import initRedirecionador from "./index/modules/redirecionador.js.js";
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