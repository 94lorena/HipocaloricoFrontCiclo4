/**
 * autor Lorena Navas
 * escrito 19/12/2021
 * Universidad Sergio Arboleda
 */



function validar(){
    let reference = $("#reference").val();
    let brand = $("#brand").val();
    let category = $("#category").val();
    let objetivo =  $("#objetivo").val();
    let description = $("#description").val();
    let availability = $("#availability").val();
    let price = $("#price").val();
    let quantity = $("#quantity").val();
    let photography = $("#photography").val();
    $("#alerta").hide();
    $("#mensaje").html("");
    if( validaesVacio(reference)) {
        $("#mensaje").html("Debe ingresar la referencia...");
        $("#alerta").show(500);
        $("#reference").focus();
        return false;
    }else if( validaesVacio(brand)) {
        $("#mensaje").html("Debe ingresar la marca...");
        $("#alerta").show(500);
        $("#brand").focus();
        return false;
    }else if( validaesVacio(category)) { 
        $("#mensaje").html("Debe seleccionar la categoría...");
        $("#alerta").show(500);
        $("#category").focus();
        return false;
    }else if( validaesVacio(price)) { 
        $("#mensaje").html("Debe ingresar  el precio...");
        $("#alerta").show(500);
        $("#price").focus();
        return false;
    }else if( validaesVacio(quantity)) { 
        $("#mensaje").html("Debe ingresar la cantidad...");
        $("#alerta").show(500);
        $("#quantity").focus();
        return false;
    }else if( validaesVacio(description)) { 
        $("#mensaje").html("Debe ingresar la descripción...");
        $("#alerta").show(500);
        $("#description").focus();
        return false;
    }else if( validaesVacio(objetivo)) {
        $("#mensaje").html("Debe ingresar el objetivo...");
        $("#alerta").show(500);
        $("#objetivo").focus();
        return false;
    }else if( validaesVacio(photography)) { 
        $("#mensaje").html("Debe ingresar la imagen...");
        $("#alerta").show(500);
        $("#photography").focus();
        return false;
    }
    else{
        $("#mensajes").html("");
        $("#mensajes").hide(500);
        return true;
    }

    return true;
}



function validarEditar(){
    //obtiene valores
    let reference = $("#referenceEdit").val();
    let brand = $("#brandEdit").val();
    let category = $("#categoryEdit").val();
    let objetivo =  $("#objetivoEdit").val();
    let description = $("#descriptionEdit").val();
    let availability = $("#availabilityEdit").val();
    let price = $("#priceEdit").val();
    let quantity = $("#quantityEdit").val();
    let photography = $("#photographyEdit").val();
    $("#alerta").hide();
    $("#mensaje").html("");
    if( validaesVacio(reference)) {
        $("#mensaje").html("Debe ingresar la referencia...");
        $("#alerta").show(500);
        $("#referenceEdit").focus();
        return false;
    }else if( validaesVacio(brand)) {
        $("#mensaje").html("Debe ingresar la marca...");
        $("#alerta").show(500);
        $("#brandEdit").focus();
        return false;
    }else if( validaesVacio(category)) { 
        $("#mensaje").html("Debe seleccionar la categoría...");
        $("#alerta").show(500);
        $("#categoryEdit").focus();
        return false;
    }else if( validaesVacio(availability)) { 
        $("#mensaje").html("Debe ingresar la disponibilidad...");
        $("#alerta").show(500);
        $("#availabilityEdit").focus();
        return false;
    }else if( validaesVacio(price)) { 
        $("#mensaje").html("Debe ingresar  el precio...");
        $("#alerta").show(500);
        $("#priceEdit").focus();
        return false;
    }else if( validaesVacio(quantity)) { 
        $("#mensaje").html("Debe ingresar la cantidad...");
        $("#alerta").show(500);
        $("#quantityEdit").focus();
        return false;
    }else if( validaesVacio(description)) { 
        $("#mensaje").html("Debe ingresar la descripción...");
        $("#alerta").show(500);
        $("#descriptionEdit").focus();
        return false;
    }else if( validaesVacio(objetivo)) {
        $("#mensaje").html("Debe ingresar el objetivo...");
        $("#alerta").show(500);
        $("#objetivoEdit").focus();
        return false;
    }else if( validaesVacio(photography)) { 
        $("#mensaje").html("Debe ingresar la imagen...");
        $("#alerta").show(500);
        $("#photographyEdit").focus();
        return false;
    }
    else{
        $("#mensajes").html("");
        $("#alerta").show(500);
        return true;
    }

    return true;
}



