/**
 * autor Lorena Navas
 * escrito 19/12/2021
 * Universidad Sergio Arboleda
 */



function validar(){
    //obtiene valores
    let identification = $("#identification").val();
    let name =  $("#name").val();
    let birthtDay = $("#birthtDay").val();
    let monthBirthtDay = $("#monthBirthtDay").val();
    let address = $("#address").val();
    let cellPhone = $("#cellPhone").val();
    let email = $("#email").val();
    let password = $("#password").val();
    let zone = $("#zone").val();
    let type = $("#type").val();
    $("#alerta").hide();
    $("#mensaje").html("");
    if( validaesVacio(identification)) {
        $("#mensaje").html("Debe ingresar la identificación...");
        $("#alerta").show(500);
        $("#identification").focus();
        return false;
    }else if( validaesVacio(name)) {
        $("#mensaje").html("Debe ingresar el nombre...");
        $("#alerta").show(500);
        $("#name").focus();
        return false;
    }else if( validaesVacio(cellPhone)) { 
        $("#mensaje").html("Debe ingresar el telefono...");
        $("#alerta").show(500);
        $("#cellPhone").focus();
        return false;
    }else if( validaesVacio(birthtDay)) { 
        $("#mensaje").html("Debe seleccionar la fecha de cumpleaños...");
        $("#alerta").show(500);
        $("#birthtDay").focus();
        return false;
    }else if( validaesVacio(email)) { 
        $("#mensaje").html("Debe ingresar el email...");
        $("#alerta").show(500);
        $("#email").focus();
        return false;
    }else if (!ValidateEmail(email)) {
        $("#mensaje").html("Debe ingresar un correo electrónico valido");
        $("#alerta").show(500);
        $("#email").focus();
        return false;
    }else if( validaesVacio(password)) {
        $("#mensaje").html("Debe ingresar el password...");
        $("#alerta").show(500);
        $("#password").focus();
        return false;
    }else if( validaesVacio(address)) { 
        $("#mensaje").html("Debe ingresar la dirección...");
        $("#alerta").show(500);
        $("#address").focus();
        return false;
    }else if( validaesVacio(zone)) { 
        $("#mensaje").html("Debe ingresar la zona...");
        $("#alerta").show(500);
        $("#zone").focus();
        return false;
    }else if( validaesVacio(type)) { 
        $("#mensaje").html("Debe seleccionar el tipo...");
        $("#alerta").show(500);
        $("#type").focus();
        return false;
    }else{
        $("#mensajes").html("");
        $("#mensajes").hide(500);
        return true;
    }
}



function validarEditar(){
    //obtiene valores
    let identification = $("#identificationEdit").val();
    let name =  $("#nameEdit").val();
    let birthtDay = $("#birthtDayEdit").val();
    let monthBirthtDay = $("#monthBirthtDayEdit").val();
    let address = $("#addressEdit").val();
    let cellPhone = $("#cellPhoneEdit").val();
    let email = $("#emailEdit").val();
    let password = $("#passwordEdit").val();
    let zone = $("#zoneEdit").val();
    let type = $("#typeEdit").val();
    $("#alerta").hide();
    $("#mensaje").html("");
    if( validaesVacio(identification)) {
        $("#mensaje").html("Debe ingresar la identificación...");
        $("#alerta").show(500);
        $("#identificationEdit").focus();
        return false;
    }else if( validaesVacio(name)) {
        $("#mensaje").html("Debe ingresar el nombre...");
        $("#alerta").show(500);
        $("#nameEdit").focus();
        return false;
    }else if( validaesVacio(cellPhone)) { 
        $("#mensaje").html("Debe ingresar el telefono...");
        $("#alerta").show(500);
        $("#cellPhoneEdit").focus();
        return false;
    }else if( validaesVacio(birthtDay)) { 
        $("#mensaje").html("Debe seleccionar la fecha de cumpleaños...");
        $("#alerta").show(500);
        $("#birthtDayEdit").focus();
        return false;
    }else if( validaesVacio(email)) { 
        $("#mensaje").html("Debe ingresar el email...");
        $("#alerta").show(500);
        $("#emailEdit").focus();
        return false;
    }else if (!ValidateEmail(email)) {
        $("#mensaje").html("Debe ingresar un correo electrónico valido");
        $("#alerta").show(500);
        $("#emailEdit").focus();
        return false;
    }else if( validaesVacio(password)) {
        $("#mensaje").html("Debe ingresar el password...");
        $("#alerta").show(500);
        $("#passwordEdit").focus();
        return false;
    }else if( validaesVacio(address)) { 
        $("#mensaje").html("Debe ingresar la dirección...");
        $("#alerta").show(500);
        $("#addressEdit").focus();
        return false;
    }else if( validaesVacio(zone)) { 
        $("#mensaje").html("Debe ingresar la zona...");
        $("#alerta").show(500);
        $("#zoneEdit").focus();
        return false;
    }else if( validaesVacio(type)) { 
        $("#mensaje").html("Debe seleccionar el tipo...");
        $("#alerta").show(500);
        $("#typeEdit").focus();
        return false;
    }else{
        $("#mensajes").html("");
        $("#mensajes").hide(500);
        return true;
    }
}



