/**
 * autor Lorena Navas
 * escrito 19/12/2021
 * Universidad Sergio Arboleda
 */



let userId;
let orders = [];
let products = [];
let quantities = [];



function estadoInicial() {
  $("#alerta").hide();
  $("#procesarOrden").hide();
  $("#pedido").hide();
  $("#pedido").html("");
  $("#listado").hide();
  let user = sessionStorage.getItem("user");
  if (user == null) location.href = "index.html";
  else {
    let userJS = JSON.parse(user);
    userId = userJS.id;
    let typeUser;
    if (userJS.type == "ASE") typeUser = "ASESOR";
    else location.href = "index.html";
    $("#nameUser").html(userJS.name);
    $("#emailUser").html(userJS.email);
    $("#typeUser").html(typeUser);
  }
}



function listar() {
  let monthBirthDay = $("#monthBirthDay").val();
  $.ajax({
    url: `http://144.22.232.221:8081/api/user/birthday/${monthBirthDay}`,
    type: "GET",
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      listarUsuarios(respuesta);
    },
    error: function (xhr, status) {
      $("#alerta").html(
        "Ocurrio un problema al ejecutar la petición..." + status
      );
    },
  });
}



function listarUsuarios(items) {
  $("#listado").html("");
  $("#listado").show(500);
  let tabla = `<table class="table table-bordered border-primary mt-5">
              <thead>
                <tr>
                  <th>Identification</th>
                  <th>Nombre</th>
                  <th>Dirección</th>
                  <th>Telefono</th>
                  <th>Email</th>
                  <th>Zona</th>
                  <th>Tipo</th>
                  <th>Cumpleaños</th>
                </tr>`;
  console.log(items);
  for (let index = 0; index < items.length; index++) {
      let texto = `<strong>Identificación:</strong> ${items[index].identification}</br><strong>Nombre:</strong> ${items[index].name}</br><strong>Email:</strong> ${items[index].email}`;
      let typeUser;
      let birthtDay = items[index].birthtDay;
      birthtDay = birthtDay.substring(0, birthtDay.indexOf("T", birthtDay));
      if (items[index].type=="ADM")
          typeUser="ADMINISTRADOR";
      else if(items[index].type=="ASE")
          typeUser="ASESOR";
      else if(items[index].type=="COORD")
          typeUser="COORDINADOR";
      tabla += `<tr>
                <td>${items[index].identification}</td>
                <td>${items[index].name}</td>
                <td>${items[index].address}</td>
                <td>${items[index].cellPhone}</td>
                <td>${items[index].email}</td>
                <td>${items[index].zone}</td>
                <td>${typeUser}</td>
                <td>${birthtDay}</td>
                  </td>
                </tr>`;
  }
  tabla += `</thead></table>`;
  $("#listado").html(tabla);

}
$(document).ready(function () {
  estadoInicial();
  $("#cerrarSession").click(function () {
    sessionStorage.removeItem("user");
    location.href = "index.html";
  });
  $("#consultarMes").click(function () {
    listar();
  });
});
