/**
 * autor Lorena Navas
 * escrito 19/12/2021
 * Universidad Sergio Arboleda
 */



let referenceSupplement;
function mostrarEliminar(reference,infproducto){
    referenceSupplement = reference;
    $("#nuevo").hide();
    $("#editar").hide();
    $("#listado").hide();
    $("#nuevoRegistro").hide();
    $("#titleIdDelete").html("Desea eliminar el producto con la referencia: " + reference + " ?...");
    $("#productDelete").html(infproducto);
    $("#eliminar").show(1000);
}



function borrarRegistro() {
    $.ajax({
        url: `http://144.22.232.221:8081/api/supplements/${referenceSupplement}`,
        type: 'DELETE',
        dataType: 'json',
        success: function (respuesta) {
            Swal.fire("Producto con referencia " + referenceSupplement + " eliminado...");
            listar();
            estadoInicial();
        },
        error: function (xhr, status) {        
            Swal.fire("No es posible eliminar el producto" + referenceSupplement + ", por favor verifique...");
        }
    });
}