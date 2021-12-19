/**
 * autor Lorena Navas
 * escrito 19/12/2021
 * Universidad Sergio Arboleda
 */



function editarRegistro(llaveRegistro) {
    let datos = {
        id: llaveRegistro
    }
    let datosPeticion = JSON.stringify(datos);
    $.ajax({
        url: "http://144.22.232.221:8081/api/supplements/" + llaveRegistro,
        type: 'GET',
        contentType: "application/JSON",
        dataType: 'json',
        success: function (respuesta) {
            console.log(respuesta);
            $("#alerta").show(1000);
            $("#mensaje").html("Información recuperada...");
            $("#alerta").hide(1000);
            editarRespuesta(respuesta);
            activaEditar();
        },
        error: function (xhr, status) {
            $("#alerta").show(500);
            $("#mensaje").html("Error peticion PUT..." + status);
            $("#mensaje").hide(1000);
        }
    });
}



function editarRespuesta(items) {
    $("#referenceEdit").val(items.reference);
    $("#brandEdit").val(items.brand);
    $("#categoryEdit").val(items.category);
    $("#objetivoEdit").val(items.objetivo);
    $("#descriptionEdit").val(items.description);
    //$("#availabilityEdit").val(items.availability);
    $("#availabilityEdit option[value="+ items.availability +"]").attr("selected",true);
    $("#priceEdit").val(items.price);
    $("#quantityEdit").val(items.quantity);
    $("#photographyEdit").val(items.photography);
}



function actualizar() {
    let datos = {
        reference: $("#referenceEdit").val(),
        brand: $("#brandEdit").val(),
        category: $("#categoryEdit").val(),
        objetivo: $("#objetivoEdit").val(),
        description: $("#descriptionEdit").val(),
        availability: $("#availabilityEdit").val(),
        price: $("#priceEdit").val(),
        quantity: $("#quantityEdit").val(),
        photography: $("#photographyEdit").val()
    }
    let datosPeticion = JSON.stringify(datos);
    if (validarEditar()) {
        $.ajax({
            url: "http://144.22.232.221:8081/api/supplements/update",
            data: datosPeticion,
            type: 'PUT',
            contentType: "application/JSON",
            success: function (respuesta) {
                console.log(respuesta);
                Swal.fire('Registro actualizado correctamente...');
                listar();
                estadoInicial();
            },
            error: function (xhr, status) {
                Swal.fire("Error peticion Post..." + status);
                //$("#mensaje").hide(1000);
            }
        });
    }
}



function activaEditar() {
    $("#editar").show(500);
    $("#brandEdit").focus();
    $("#nuevo").hide();
    $("#nuevoRegistro").hide(500)
    $("#listado").hide(500);
}