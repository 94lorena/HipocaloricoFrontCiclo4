/**
 * autor Lorena Navas
 * escrito 19/12/2021
 * Universidad Sergio Arboleda
 */



let userZona;
let orders = [];
let salesman = {};
let oderId;



function estadoInicial() {
    $("#alerta").hide();
    $("#detalleOrden").hide();
    $("#procesarOrden").hide();
    $("#pedido").html("");
    $("#listado").hide();
    let user = sessionStorage.getItem("user");
    if (user == null) location.href = "index.html";
    else {
        let userJS = JSON.parse(user);
        userZona = userJS.zone;
        let typeUser;
        if (userJS.type == "COORD") typeUser = "COORDINADOR";
        else location.href = "index.html";
        $("#nameUser").html(userJS.name);
        $("#emailUser").html(userJS.email);
        $("#typeUser").html(typeUser);
    }
    listar();
}



function listar() {
    $.ajax({
        url: `http://144.22.232.221:8081/api/order/zona/${userZona}`,
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
                    <th>Identificación</th>
                    <th>Nombres</th>
                    <th>Email</th>
                    <th>Fecha</th>
                    <th>Id</th>
                    <th>Estado</th>                    
                    <th>Ver detalle</th>
                </tr>`;
    for (let i = 0; i < orders.length; i++) {
        let orderDate = orders[i].registerDay;
        let ocurrence = orderDate.indexOf("T");
        orderDate = orderDate.substring(0, ocurrence);
        salesMan = orders[i].salesMan;
        tabla += `<tr>
                <td>${salesMan.identification}</td>
                <td>${salesMan.name}</td>
                <td>${salesMan.email}</td>
                <td>${orderDate}</td>
                <td>${orders[i].id}</td>
                <td>${orders[i].status}</td>
                <td><button class="btn btn-outline-primary" id="ped_${orders[i].id}" onclick="detalleOrden(${i})">Ver pedido</button></</td>
            </tr>`;
    }
    tabla += `</thead></table>`;
    $("#listado").html(tabla);
    $("#listado").show(1000);
}



function detalleOrden(indice) {
    let order = orders[indice];
    let products = [];
    let quantities = [];
    let objeto;
    let objetoCantidad;
    oderId = order.id;
    $("#listado").hide(500);
    products = order.products;
    quantities = order.quantities;
    let tabla = `<table class="table-responsive table-bordered border-primary text-nowrap">
                <thead>
                <tr>
                    <th>Identificación</th>
                    <th>Nombres</th>
                    <th>Email</th>
                    <th>Fecha</th>
                    <th>Id</th>
                    <th>Estado</th>                                        
                </tr>`;
        let orderDate = order.registerDay;
        let ocurrence = orderDate.indexOf("T");
        orderDate = orderDate.substring(0, ocurrence);
        salesMan = order.salesMan;
        tabla += `<tr>
                    <td>${salesMan.identification}</td>
                    <td>${salesMan.name}</td>
                    <td>${salesMan.email}</td>
                    <td>${orderDate}</td>
                    <td>${order.id}</td>
                    <td>${order.status}</td>
                    </tr>`;
    
    tabla += `</thead></table>`;
    let tablaProductos = tabla + `<table class="table-responsive table-bordered border-primary text-nowrap mt-5">
                <thead>
                <tr>
                    <th>Referencia</th>
                    <th>Categoría</th>
                    <th>Marca</th>
                    <th>Descripcción</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                </tr>`;
    for (let property in products) {
        objeto = products[property];
        objetoCantidad = quantities[property];
        tablaProductos += `<tr>
        <td>${objeto.reference}</td>
        <td>${objeto.category}</td>
        <td>${objeto.brand}</td>
        <td>${objeto.description}</td>
        <td>${objeto.price}</td>
        <td>${objetoCantidad}</td>
        </tr>`;
    }
    tablaProductos += `</thead></table>`;
    $("#orden").html(tablaProductos);
    $("#detalleOrden").show(1000);
}



function actualizarEstadoOrden(){
    let estadoOrden = $("#estadoOrden").val();
    let datos = {
        id: oderId,
        status: estadoOrden
    }
    let datosPeticion = JSON.stringify(datos);
    $.ajax({
        url: `http://144.22.232.221:8081/api/order/update`,
        data: datosPeticion,
        type: 'PUT',
        contentType: "application/JSON",
        success: function (respuesta) {
            console.log(respuesta);
            estadoInicial()
        },
        error: function (xhr, status) {
            $("#alerta").html(
                "Ocurrio un problema al ejecutar la petición..." + status
            );
        },
    });    
}


$(document).ready(function () {
    estadoInicial();
    $("#cerrarSession").click(function () {
        sessionStorage.removeItem("user");
        location.href = "index.html";
    });

    $("#cancelarDetalle").click(function () {
        $("#detalleOrden").hide(1000);
        $("#listado").show(1000);
    });

    $("#actualizarOrden").click(function () {
        actualizarEstadoOrden();
    });
});
