export default function initRenderizarNomeUsuario() {
    console.log("estou funcionando")
    let nome = localStorage.getItem("nome");
    const boasVindas = document.querySelector(".boas-vindas");

    boasVindas.innerText = `Bem-vindo ${nome}`; 

}