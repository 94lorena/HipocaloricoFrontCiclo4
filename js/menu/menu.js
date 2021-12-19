/**
 * autor Lorena Navas
 * escrito 19/12/2021
 * Universidad Sergio Arboleda
 */



$(document).ready(function () {
  estadoInicial();
    $("#cerrarSession").click(function (){
        sessionStorage.removeItem("user");
        location.href="index.html"
    });

});



function estadoInicial() {
  $("#opcionesAsesor").hide();
  $("#opcionesAdm").hide();
  $("#opcionesCoord").hide();
  let user = sessionStorage.getItem("user");
  if (user == null) location.href = "index.html";
  else {
    let userJS = JSON.parse(user);
    let typeUser;
    if (userJS.type=='ASE')
        typeUser="ASESOR";
    else if (userJS.type=='ADM')
        typeUser="ADMINISTRADOR";
    else if (userJS.type=='COORD')
        typeUser="COORDINADOR";



    if (userJS.type == "ASE"){
      $("#opcionesAsesor").show();
      $("#opcionesAdm").hide();
      $("#opcionesCoord").hide();
    }else if (userJS.type == "ADM"){
      $("#opcionesAdm").show();
      $("#opcionesAsesor").hide();
      $("#opcionesCoord").hide();
    }else if (userJS.type == "COORD"){
      $("#opcionesCoord").show();
      $("#opcionesAsesor").hide();
      $("#opcionesAdm").hide();
    }  
    $("#userName").html(userJS.name);
    $("#userEmail").html(userJS.email);
    $("#userType").html(typeUser);
    $("#titulo").html("Bienvenido(a): " + userJS.name);
  }
}
