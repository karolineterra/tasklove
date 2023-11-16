export default function validarCadastro() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  const erroCadastro = document.querySelector(".erroCadastro");

  // Adicione suas regras de validação aqui
  if (nome === "" || email === "" || senha === "" || senha !== confirmarSenha) {
    erroCadastro.innerHTML =
      "<img src='./img/icon-alerta.png'> <p>Por favor, preencha todos os campos corretamente.</p>";
    erroCadastro.classList.add("ativo");
    return false; // Impede a abertura do modal se a validação falhar
  }

  // Se a validação passar, salve no localStorage
  localStorage.setItem("nome", nome);
  localStorage.setItem("email", email);
  localStorage.setItem("senha", senha);

  return true; // Permite a abertura do modal
}
