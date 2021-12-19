/**
 * autor Lorena Navas
 * escrito 19/12/2021
 * Universidad Sergio Arboleda
 */



let productos = [];
let productosSeleccionados = [];
let cantidades = [];



function estadoInicial(){
    $("#alerta").hide();
    $("#procesarOrden").hide();
    $("#pedido").hide();
    $("#pedido").html("");
    
    
    let user = sessionStorage.getItem("user");
    if (user== null)
        location.href="index.html";
    else{
        let userJS = JSON.parse(user);
        let typeUser;
        if (userJS.type=='ASE')
            typeUser="ASESOR";
        else if (userJS.type=='ADM')
            typeUser="ADMINISTRADOR";
        else if (userJS.type=='COORD')
            typeUser="COORDINADOR";
        $("#nameUser").html(userJS.name);
        $("#emailUser").html(userJS.email);
        $("#typeUser").html(typeUser);
    }
    $("#listado").show(500);    
}



function listar() {
    $.ajax({
        // la URL para la petición (url: "url al recurso o endpoint")
        url: "http://144.22.232.221:8081/api/supplements/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            listarProductos(respuesta);
        },
        error: function (xhr, status) {
            $("#alerta").html("Ocurrio un problema al ejecutar la petición..." + status);
        }
    });
}



function listarProductos(items){
    $("#listado").html("");
    $("#listado").show(500);
    productos = items;
    let tabla = `<table class="table-responsive table-bordered border-primary text-nowrap">
                <thead>
                <tr>
                    <th>Referencia</th>
                    <th>Categoría</th>
                    <th>Marca</th>
                    <th>Descripcción</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Acción</th>
                </tr>`;
    for (let index = 0; index < items.length; index++) {
        let texto = `<strong>Referencia:</strong> ${items[index].reference}</br><strong>Descripción:</strong> ${items[index].description}`;
        let availability = items[index].availability ? 'SI':'NO';
        tabla +=`<tr>
                <td>${items[index].reference}</td>
                    <td>${items[index].category}</td>
                    <td>${items[index].brand}</td>
                    <td>${items[index].description}</td>
                    <td>${items[index].price}</td>
                    <td><input type="number" id="prod_${items[index].reference}"/ ></td>
                <td><button class="btn btn-success" id="bot_${items[index].reference}" onclick="registrarproducto('${index}')">Agregar</button></td>
                    </td>
                </tr>`;     
    }
    tabla +=`</thead></table>`;
    $("#listado").html(tabla);
}



function registrarproducto(indice){
    $("#alerta").hide();
    let referencia = productos[indice].reference;
    let idCaja= `prod_${referencia}`;
    let index=0;
    let encontro=false;
    cantidadProducto = parseInt(document.getElementById(idCaja).value);
    if (isNaN(cantidadProducto) || cantidadProducto <= 0){
        $("#alerta").show(500);
        $("#alerta").html("Es necesario ingresar la cantidad, y debe ser un valor mayor a 0...");
        document.getElementById(idCaja).focus();
        return;
    }else{
        $("#procesarOrden").show();
        cantidadProducto = parseInt(document.getElementById(idCaja).value);
    }
    for (index = 0; index < productosSeleccionados.length; index++) {
        if (productosSeleccionados[index].reference ==referencia){
            encontro=true;
            break;
        }
    }
    if (encontro){
        cantidades[index] = cantidades[index] + cantidadProducto;
    }else{
        cantidades.push(cantidadProducto);
        productosSeleccionados.push(productos[indice]);
    }
    document.getElementById(idCaja).value="";
    document.getElementById(idCaja).focus();
    pintarPedido();
}



function pintarPedido(){
    let tabla= document.querySelector("#pedido");
    let subtotal = 0;
    tabla.innerHTML="";
    let tr = document.createElement("tr")
    let tdReference = document.createElement("td")
    let tdPrice = document.createElement("td")
    let tdCantidad = document.createElement("td")
    let tdsubTotal = document.createElement("td")
    tdReference.innerHTML="Referencia";
    tdPrice.innerHTML="Precio";
    tdCantidad.innerHTML="Cantidad";
    tdsubTotal.innerHTML="Subtotal";
    tr.appendChild(tdReference);
    tr.appendChild(tdPrice);
    tr.appendChild(tdCantidad);
    tr.appendChild(tdsubTotal);
    tabla.appendChild(tr);


    for (let indice = 0; indice < productosSeleccionados.length; indice++) {
                tr = document.createElement("tr")
                tdReference = document.createElement("td")
                tdPrice = document.createElement("td")
                tdCantidad = document.createElement("td")
                tdsubTotal = document.createElement("td")
                precio = parseInt(productosSeleccionados[indice].price);
                cantidad = parseInt(cantidades[indice]);
                tdReference.innerHTML = productosSeleccionados[indice].reference;
                tdPrice.innerHTML =  productosSeleccionados[indice].price;
                tdCantidad.innerHTML = cantidades[indice]
                tdsubTotal.innerHTML = (precio * cantidad);
                tr.appendChild(tdReference);
                tr.appendChild(tdPrice);
                tr.appendChild(tdCantidad);
                tr.appendChild(tdsubTotal);
                tabla.appendChild(tr);
                subtotal = subtotal + precio * cantidad;
        }
        tr = document.createElement("tr");
        tdsubTotal = document.createElement("td")
        tdTitulo = document.createElement("th")
        tdsubTotal.innerHTML=subtotal;
        tdTitulo.innerHTML="Total";
        tr.appendChild(tdTitulo).colSpan="3";
        tr.appendChild(tdsubTotal);
        tabla.appendChild(tr);

        $("#pedido").show();
        $("#procesarOrden").show();
}


function procesarOrden(){
    let user = sessionStorage.getItem("user");
    let orderDate = new Date();
    let userJs = JSON.parse(user);
    let productos = {};
    let quantities ={};
    for (let i = 0; i < productosSeleccionados.length; i++) {
        productos[productosSeleccionados[i].reference]=productosSeleccionados[i]; 
        quantities[productosSeleccionados[i].reference]=cantidades[i];  
    }
    let order = {
        registerDay: orderDate.toISOString(),
        status: "Pendiente",
        salesMan: userJs,
        products: productos,
        quantities:quantities 
    }
    let orderJson = JSON.stringify(order);
    $.ajax({
        url: "http://144.22.232.221:8081/api/order/new",
        data : orderJson,
        type: 'POST',
        contentType:"application/JSON",
        success: function (respuesta) {
            $("#alerta").show(1000);
            $("#mensaje").html("Orden de pedido procesada correctamente");
            $("#alerta").hide(1000);
            productosSeleccionados=[];
            cantidades=[];
            estadoInicial();
            listar();
            Swal.fire('Orden de pedido ' +respuesta.id + ' procesada correctamente...');
        },
        error: function (xhr, status) {
            $("#mensajes").show(1000);
            $("#mensajes").html("Error peticion POST..." + status );
        }
    });
}
$(document).ready(function () {
    estadoInicial();
    listar();
    $("#cerrarSession").click(function (){
        sessionStorage.removeItem("user");
        location.href="index.html"
    });
    $("#procesarOrden").click(function (){
        procesarOrden();
    });
});

