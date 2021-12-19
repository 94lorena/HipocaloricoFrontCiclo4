/**
 * autor Lorena Navas
 * escrito 19/12/2021
 * Universidad Sergio Arboleda
 */



let userId;
let orders = [];
let products = [];
let quantities=[];



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
  listar();
}



function listar() {
  let estadoOrden = $("#estadoOrden").val();

  $.ajax({
    url: `http://144.22.232.221:8081/api/order/salesman/${userId}`,
    type: "GET",
    dataType: "json",
    success: function (respuesta) {
      console.log(respuesta);
      listarProductos(respuesta);
    },
    error: function (xhr, status) {
      $("#alerta").html(
        "Ocurrio un problema al ejecutar la petición..." + status
      );
    },
  });
}



function listarProductos(items) {
  orders = items;
  console.log("Ordenes");
  console.log(orders);
  let tabla = `<table class="table-responsive table-bordered border-primary text-nowrap">
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Fecha</th>
                    <th>Estado</th>                    
                    <th>Productos</th>
                  </tr>`;
  for (let i = 0; i < orders.length; i++) {
    let orderDate = orders[i].registerDay;
    let ocurrence = orderDate.indexOf("T");
    orderDate = orderDate.substring(0, ocurrence);
    tabla += `<tr>
                <td>${orders[i].id}</td>
                <td>${orderDate}</td>
                <td>${orders[i].status}</td>`;
    products = orders[i].products;
    quantities = orders[i].quantities;
    let tablaProductos = `<table class="table-responsive table-bordered border-primary text-nowrap">
                <thead>
                  <tr>
                    <th>Referencia</th>
                    <th>Categoría</th>
                    <th>Marca</th>
                    <th>Descripcción</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                  </tr>`;
    let propiedades = Object.keys(products);
    let propiedadesCantidades = Object.keys(quantities);
    let objeto;
    let objetoCantidad;
    for (const property in products) {
        console.log(`${property}: ${products[property]}`);
        console.log(`${property}: ${quantities[property]}`);

        objeto = products[property];
        objetoCantidad = quantities[property];

        tablaProductos +=`<tr>
        <td>${objeto.reference}</td>
        <td>${objeto.category}</td>
        <td>${objeto.brand}</td>
        <td>${objeto.description}</td>
        <td>${objeto.price}</td>
        <td>${objetoCantidad}</td>
      </tr>`;    
    }
    tablaProductos +=`</thead></table>`;
    tabla += `<td>${tablaProductos}</td>`;
    tabla += `</tr>`;
  }
  tabla += `</thead></table>`;
  $("#listado").html(tabla);
  $("#listado").show(1000);
}



$(document).ready(function () {
  estadoInicial();
  $("#cerrarSession").click(function () {
    sessionStorage.removeItem("user");
    location.href = "index.html";
  });
});
