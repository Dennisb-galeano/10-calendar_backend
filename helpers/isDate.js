// esta fn se va a disparar para poder realizar las validaciones de fecha con el custom() ,en Router > events.js cno el check
//va a imprimir en consola TODOS LOS ARGUMENTOS QUE RECIBE
//Esta fn se utiliza en routes > events.js en la validacion de los campos check


const moment = require( 'moment');

const isDate = (value) => { //Se dispara con varios argumentos
 
  if( !value){ // dice que si la fn regresa false, el campo no es correcto y la validacion va a fallar 
    return false;
  }

  const fecha = moment(value); //se le manda el valor a moment, recibe cualquier valor y moment indica si la fecha es correcta o no 

   if( fecha.isValid()) {//fn de moment
    return true;  
  } else {
    return false;
  }
}


module.exports = { isDate };




