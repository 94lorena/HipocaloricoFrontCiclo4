/**
 * autor Lorena Navas
 * escrito 19/12/2021
 * Universidad Sergio Arboleda
 */



function activaNuevo() {
    $("#nuevo").show(500);
    $("#reference").focus();
    $("#editar").hide();
    $("#nuevoRegistro").hide(500)
    $("#listado").hide(500);
    $("#availability option[value=true]").attr("selected",true);
}



function registrar() {
    let datos = {
        reference: $("#reference").val(),
        brand: $("#brand").val(),
        category: $("#category").val(),
        objetivo: $("#objetivo").val(),
        description: $("#description").val(),
        availability: $("#availability").val(),
        price: $("#price").val(),
        quantity: $("#quantity").val(),
        photography: $("#photography").val()
    }
    if (validar()) {
        let datosPeticion = JSON.stringify(datos);
        $.ajax({
            url: "http://144.22.232.221:8081/api/supplements/new",
            data: datosPeticion,
            type: 'POST',
            contentType: "application/JSON",
            success: function (respuesta) {
                console.table(respuesta);
                Swal.fire('Registro ingresado correctamente...');
                listar();
                estadoInicial();
            },
            error: function (xhr, status) {
                $("#mensajes").show(1000);
                $("#mensajes").html("Error peticion POST..." + status);
            }
        });
    }
}