/**
 * autor Lorena Navas
 * escrito 19/12/2021
 * Universidad Sergio Arboleda
 */



$(document).ready(function () {
    estadoInicial();
    listar();
    $("#cerrarSession").click(function (){
        sessionStorage.removeItem("user");
        location.href="index.html"
    });

    $("#reference").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
    $("#brand").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);    
    });
    $("#category").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
    $("#objetivo").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
    $("#description").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
    $("#availability").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
    $("#price").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
    $("#quantity").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
    $("#photography").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
});



function listar() {
    $.ajax({
        url: "http://144.22.232.221:8081/api/supplements/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            listarProductos(respuesta);
        },
        error: function (xhr, status) {
            $("#mensajes").html("Ocurrio un problema al ejecutar la petición..." + status);
            //$("#mensajes").hide(1000);
        },
        complete: function (xhr, status) {
            $("#mensajes").html("Obteniendo listado productos...");
            $("#mensajes").hide(1000);
        }
    });
}



function listarProductos(items) {
    $("#listado").html("");
    $("#listado").show(500);
    let tabla = `<table class="table table-bordered border-primary mt-5">
                <thead>
                <tr>
                    <th>Referencia</th>
                    <th>Categoría</th>
                    <th>Marca</th>
                    <th>Descripción</th>
                    <th>Disponibilidad</th>
                    <th>Precio</th>
                    <th>Imagen</th>
                    <th colspan="2">Acciones</th>
                </tr>`;
    console.log(items);
    for (let index = 0; index < items.length; index++) {
        let texto = `<strong>Referencia:</strong> ${items[index].reference}</br><strong>Descripción:</strong> ${items[index].description}`;
        let availability = items[index].availability ? 'SI' : 'NO';
        tabla += `<tr>
                    <td>${items[index].reference}</td>
                    <td>${items[index].category}</td>
                    <td>${items[index].brand}</td>
                    <td>${items[index].description}</td>
                    <td>${availability}</td>
                    <td>${items[index].price}</td>
                    <td><img class="img-thumbnail" src="${items[index].photography}" class="img-fluid"/></td>
                    <td><button class="btn btn-outline-primary" onclick="editarRegistro('${items[index].reference}')">Editar</button></td>
                    <td><button class="btn btn-outline-danger" onclick="mostrarEliminar('${items[index].reference}','${texto}')">Borrar</button></td>
                    </td>
                    </tr>`;
    }
    tabla += `</thead></table>`;
    $("#listado").html(tabla);
}



function estadoInicial() {
    $("#alerta").hide();
    $("#mensaje").html("");
    $("#nuevo").hide();
    $("#editar").hide();
    $("#listado").show(500);
    $("#nuevoRegistro").show(500)
    $("#eliminar").hide();
    $("#idDelete").hide();
    $("#reference").val("");
    $("#brand").val("");
    $("#category").val("");
    $("#objetivo").val("");
    $("#description").val("");
    $("#availability").val("");
    $("#price").val("");
    $("#quantity").val("");
    $("#photography").val("");
    let user = sessionStorage.getItem("user");
    let userJS;
    let typeUser;
    if (user == null) location.href = "index.html";
    else {
        userJS = JSON.parse(user);
        if (userJS.type == 'ADM')
            typeUser = "ADMINISTRADOR";
        else location.href = "index.html";
    }
    $("#userName").html(userJS.name);
    $("#userEmail").html(userJS.email);
    $("#userType").html(typeUser);
    $("#titulo").html("Bienvenido(a): " + userJS.name);
}



function verImagen(img) {
    let imagen = `${img}`;
    Swal.fire({
        title: 'Sweet!',
        text: 'Modal with a custom image.',
        imageUrl: `'${imagen}'`,
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
    })
}