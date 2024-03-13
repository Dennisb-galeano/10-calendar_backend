/*aca se va a recibir toda la infoprmacion de todo lo que se va a ejecutaar, 
los datos de la req, se pueden enviar el res.json, 
next= es una fn uqe se llama si todo el middleware se ejecuta correctamente. este se llama o ejecuta dentro de los Check del routes/authn 
  ( una vez se ejecuta el check del autj ) se llama el next y este hace uqe se pase al siguiente middleware. cuando termine, llama al sig y asi... 
    cuado llega al ultimo el next seria el controlador propiamente.
    
        el next se debe llamar de manera condicional 

          de controllers/auth tomo(corto)  los condicionales del loginUsuario

*/



const {response} = require('express');  //importacion= const {requiero es response del express} = require( y se importa el express), pero como solo necesicot el responde, se ese paquete se desestructura el response 
const { validationResult} = require('express-validator');


const validarCampos = ( req, res=response, next) => { //next: es un callback

  //manejo de errores
  const errors = validationResult ( req );
  if( !errors.isEmpty() ){
    return res.status(400).json({
        ok: false,
        errors: errors.mapped()
    });
  }
  // si no hay error se llama el next, si hay un error se realiza el return y no se llama el next!
  next();
}

//exportacion de node
module.exports={
  validarCampos
}


//implementar en el routes/auth.js

/*manejo de errores, con info
  const errors = validationResult( req );  //para obtener los errores, se importa el middleware de express-validator validationResult y se manda la (request),  el resultado de la validacion
    console.log(errors);
    if( !errors.isEmpty() ) { //si, hay errores  .isEmpty(es un objeto del express validator) entonces return 
      return res.status(400).json( { //se manda el estatus 400 por que es un bad request
        ok: false, 
        errors: errors.mapped() //asi se resializan todos los errores en un objetoo faacil de trabajar
      })
    }
    //el return del if, evita que se ejecute l res.json. de la sig linea
    //si todo sale bien, se va a mandar un Status(201): "Se graba informacion correctamente"

*/