/**
 * autor Lorena Navas
 * escrito 19/12/2021
 * Universidad Sergio Arboleda
 */



function upperCaseF(campo) {
    setTimeout(function () {
        campo.value = campo.value.toUpperCase();
    }, 1);
}



function validaesVacio(dato){
    return !dato.trim().length;
}



function ValidateEmail(valor) {
    var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return valor.match(mailformat);
}