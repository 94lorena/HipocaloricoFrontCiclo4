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
        url: "http://144.22.232.221:8081/api/user/" + llaveRegistro,
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
    let birthtDay = items.birthtDay;
    birthtDay = birthtDay.substring(0, birthtDay.indexOf("T", birthtDay));
    $("#idEdit").val(items.id);
    $("#identificationEdit").val(items.identification);
    $("#nameEdit").val(items.name);
    $("#birthtDayEdit").val(birthtDay);
    $("#addressEdit").val(items.address);
    $("#cellPhoneEdit").val(items.cellPhone);
    $("#emailEdit").val(items.email);
    $("#passwordEdit").val(items.password);
    $("#zoneEdit").val(items.zone);
    $("#typeEdit").val(items.type);
}



function actualizar() {
    let birthday= $("#birthtDayEdit").val();
    let position = birthday.indexOf("-");
    let monthBirthtDay = birthday.substring(position+1,position+3)
    let datos = {
        id: $("#idEdit").val(),
        identification: $("#identificationEdit").val(),
        name: $("#nameEdit").val(),
        birthtDay: $("#birthtDayEdit").val(),
        monthBirthtDay:monthBirthtDay,
        address: $("#addressEdit").val(),
        cellPhone: $("#cellPhoneEdit").val(),
        email: $("#emailEdit").val(),
        password: $("#passwordEdit").val(),
        zone: $("#zoneEdit").val(),
        type: $("#typeEdit").val()
    }
    let datosPeticion = JSON.stringify(datos);
    if (validarEditar()) {
        $.ajax({
            url: "http://144.22.232.221:8081/api/user/update",
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
    $("#identificationEdit").focus();
    $("#nuevo").hide();
    $("#nuevoRegistro").hide(500)
    $("#listado").hide(500);
}