/**
 * autor Lorena Navas
 * escrito 19/12/2021
 * Universidad Sergio Arboleda
 */



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



function listarxPrecio() {
    let precio = $("#byPrice").val();
    if(!validaesVacio(precio)) {
        $.ajax({
            url: `http://144.22.232.221:8081/api/supplements/price/${precio}`,
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
    }else{
        $("#byPrice").focus();
        Swal.fire("Debe  ingresar el precio, por favor verifique...");        
    }
}



function listarxDescripcion() {
    let descripcion = $("#byDescription").val();
    if(!validaesVacio(descripcion)) {
        $.ajax({
            url: `http://144.22.232.221:8081/api/supplements/description/${descripcion}`,
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
    }else{
        $("#byDescription").focus();
        Swal.fire("Debe  ingresar una descripción, por favor verifique...");        
    }
}



function listarProductos(items) {
    let opcionConsultaSeleccionada = $("#opcionConsulta").val();
    $("#listado").html("");
    $("#listadoxprecio").html("");
    $("#listadoxdescripcion").html("");
    if (opcionConsultaSeleccionada=="0"){
        $("#listado").show()
        $("#listadoxprecio").hide()
        $("#listadoxdescripcion").hide()
    }else if (opcionConsultaSeleccionada=="1"){
        $("#listadoxprecio").show()
        $("#listado").hide()
        $("#listadoxdescripcion").hide()
    }else if (opcionConsultaSeleccionada=="2"){
        $("#listadoxdescripcion").show()
        $("#listado").hide()
        $("#listadoxprecio").hide()
    }
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
                </td>
                    </tr>`;
    }
    tabla += `</thead></table>`;
    if (opcionConsultaSeleccionada=="0"){
        $("#listado").html(tabla);
    }else if (opcionConsultaSeleccionada=="1"){
        $("#listadoxprecio").html(tabla);
    }else if (opcionConsultaSeleccionada=="2"){
        $("#listadoxdescripcion").html(tabla);
    }
}



function estadoInicial() {
    $("#alerta").hide();
    $("#mensaje").html("");
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