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
    $("#identification").click(function (){
        $("#mensaje").html("");
        $("#alerta").hide(500);
    });
    $("#name").click(function (){
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
        url: "http://144.22.232.221:8081/api/user/all",
        type: 'GET',
        dataType: 'json',
        success: function (respuesta) {
            listarUsuarios(respuesta);
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
                    <th colspan="2">Acciones</th>
                    </tr>`;
    console.log(items);
    for (let index = 0; index < items.length; index++) {
        let texto = `<strong>Identificación:</strong> ${items[index].identification}</br><strong>Nombre:</strong> ${items[index].name}</br><strong>Email:</strong> ${items[index].email}`;
        let typeUser;
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
                    <td><button class="btn btn-outline-primary" onclick="editarRegistro(${items[index].id})">Editar</button></td>
                    <td><button class="btn btn-outline-danger" onclick="mostrarEliminar(${items[index].id},'${texto}')">Borrar</button></td>
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
    $("#identification").val("");
    $("#name").val("");
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