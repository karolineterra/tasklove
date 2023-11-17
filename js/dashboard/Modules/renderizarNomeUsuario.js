export default function initRenderizarNomeUsuario() {
  let nome = localStorage.getItem("nome");
  const boasVindas = document.querySelector(".boas-vindas");
  const nomeUsuario = document.querySelector(".userNameProfile");

  boasVindas.innerText = `Welcome ${nome}!`;
  nomeUsuario.innerText = nome;
}
