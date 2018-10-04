var database = firebase.database();
$(document).ready(function(){
  $("#sign-up-button").click(function(event){
    event.preventDefault();
    
    var email = $("#sign-up-email").val();
    var name = $("#sign-up-name").val();
    var password = $("#sign-up-password").val();
    var adress = $("#sign-up-adress").val();
    firebase.auth().createUserWithEmailAndPassword(email, password).then(function(response){
      console.log("deu certo");
      var userId = response.uid;
      database.ref("users/" + userId).set({
        name: name,
        email: email,
        adress: adress
      });
      window.location = "home.html?userId=" + userId;
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  });
  $("#sign-in-button").click(function(event){
    event.preventDefault();
    var email = $("#sign-in-email").val();
    var password = $("#sign-in-password").val();
    firebase.auth().signInWithEmailAndPassword(email, password).then(function(response){
      var userId = response.uid;
      window.location = "home.html?userId=" + userId;
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      alert(errorMessage);
    });

  });
});
