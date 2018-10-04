$(document).ready(function(){ // iniciar Jquery
$(".sign-up-button").click(function(event){ // funcao de clique no button com event.preventDefault para ele nao dar refresh na pagina automaticamente, isso só acontece pois tem um botao dentro do form
event.preventDefault();

var email = $(".sign-up-email").val();//pegar email, trecho digitado
var password = $(".sign-up-password").val();// pegar senha, trecho digitado


firebase.auth().createUserWithEmailAndPassword(email, password)
.then(function(){ // trecho digitado
	
	})
.catch(function(error) { // trecho copiado do site 
 
  var errorCode = error.code;
  var errorMessage = error.message;
 alert(errorCode, errorMessage); // pode-se usar isso para exxibir uma msg de erro
});
}); //fim funcao clique
}); //fim do ready