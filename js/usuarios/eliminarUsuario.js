/**
 * autor Lorena Navas
 * escrito 19/12/2021
 * Universidad Sergio Arboleda
 */



let userId;
function mostrarEliminar(id,infproducto){
    userId = id;
    $("#nuevo").hide();
    $("#editar").hide();
    $("#listado").hide();
    $("#nuevoRegistro").hide();
    $("#titleIdDelete").html("Desea eliminar el usuario ?...");
    $("#productDelete").html(infproducto);
    $("#eliminar").show(1000);
}



function borrarRegistro() {
    $.ajax({
        url: `http://144.22.232.221:8081/api/user/${userId}`,
        type: 'DELETE',
        dataType: 'json',
        success: function (respuesta) {
            Swal.fire("Usuario : " + userId + " eliminado...");
            listar();
            estadoInicial();
        },
        error: function (xhr, status) {        
            Swal.fire("No es posible eliminar el Usuario" + userId + ", por favor verifique...");
        }
    });
}