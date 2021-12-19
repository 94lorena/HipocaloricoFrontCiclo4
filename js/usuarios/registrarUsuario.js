/**
 * autor Lorena Navas
 * escrito 19/12/2021
 * Universidad Sergio Arboleda
 */



function activaNuevo() {
    $("#nuevo").show(500);
    $("#identification").focus();
    $("#editar").hide();
    $("#nuevoRegistro").hide(500)
    $("#listado").hide(500);
    $("#availability option[value=true]").attr("selected",true);
}



function registrar() {
    let birthday= $("#birthtDay").val();
    let position = birthday.indexOf("-");
    let monthBirthtDay = birthday.substring(position+1,position+3)
    let datos = {
        identification: $("#identification").val(),
        name: $("#name").val(),
        birthtDay: $("#birthtDay").val(),
        monthBirthtDay:monthBirthtDay,
        address: $("#address").val(),
        cellPhone: $("#cellPhone").val(),
        email: $("#email").val(),
        password: $("#password").val(),
        zone: $("#zone").val(),
        type: $("#type").val()
    }
    if (validar()) {
        let datosPeticion = JSON.stringify(datos);
        $.ajax({
            url: "http://144.22.232.221:8081/api/user/new",
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