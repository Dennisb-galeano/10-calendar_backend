
//habilitar la ruta (index.js)

/*para exportaren NODE 
  Se debe importar express
  configurar un router , ejecutar su fn. para llegar a esta ruta y pra recordar el path 
*/

/* rutas de usuarios / auth  - ayuda a conocer las rutas del path -  la ruta que me muestra el  ok:true.
  localhost:1111 + /api/auth 
*/


const express = require('express');
const router = express.Router();

const { check } = require('express-validator'); //check middleware encargado de validar un campo particular a la vez, se unsa en endpoints 


//importar la fn, que se va a ejecutar en el router, esta es la referencia a la fn creada en auth/cntrolers
const {crearUsuario, loginUsuario, revalidarToken} = require('../controlers/auth');

//*Endpoints
router.post(    //si necesito aplicar un midelware ",SEGUNDO VALOR" puedo poner la fn, pero como necesito varios va entre llaves [] "una coleccion de midlewares"
'/new', //rutas
[ //middlewares
  check('name', 'el nombre es obligatorio').not().isEmpty(), //1. check:campo que queiro evaluar, 2.'mensaje de error').not().isEmpty uqe no debe estar vacio (el nombre, debe ser obligatorio), no deb estar vacio, enviar mas de un valor en check para que me muestre los errores, si necesito ver los errores ir a CONTROLLERS/AUTH "Manejo de errores"
  check('email', 'el email es obligatorio').isEmail(), //si no se envia un email, va a generar error en la validacion
  check('password', 'el password debe de ser de seis caracteres').isLength({ min: 6}), //se puede colocar cualquir cantiad de validaciones que se necesiten
],
crearUsuario); 

router.post(  //1.app 2.el tipo de peticion que esta esperando 'POST'y el / 3,segundo argumento es un callbak "fn de flecha" este se dispara con el requiest y el otro el response
'/', //ruta
[
  check('email','el E-mail es obligstorio').isEmail(),
  check('password', 'el password debe de ser de seis caracteres').isLength({ min: 6}),
],
loginUsuario );

router.get('/renew', revalidarToken);  //1.app 2.el  peticion que esta esperando GET y el / 3,segundo argumento es un callbak "fn de flecha" este se dispara con el requiest y el otro el response



//en lugar del app va a ser Router, para habilitar que esta ruta esta ok, debo exportar algo (la ruta) para uqe se implemente cunado se utilice ese midleware
//*EXPORTACION USADA EN NODE
  module.exports = router; // = es lo que quiero exportar en este caso el Router