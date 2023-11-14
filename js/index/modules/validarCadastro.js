export default function validarCadastro() {
  const nome = document.getElementById("nome").value;
  const email = document.getElementById("email").value;
  const senha = document.getElementById("senha").value;
  const confirmarSenha = document.getElementById("confirmarSenha").value;

  // Adicione suas regras de validação aqui
  if (nome === "" || email === "" || senha === "" || senha !== confirmarSenha) {
    alert("Por favor, preencha todos os campos corretamente.");
    return false; // Impede a abertura do modal se a validação falhar
  }

  // Se a validação passar, salve no localStorage
  localStorage.setItem("nome", nome);
  localStorage.setItem("email", email);
  localStorage.setItem("senha", senha);

  return true; // Permite a abertura do modal
}
