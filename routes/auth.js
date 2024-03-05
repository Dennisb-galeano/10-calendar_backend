
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


//importar la fn, que se va a ejecutar en el router, esta es la referencia a la fn creada en auth/cntrolers
const {crearUsuario, loginUsuario, revalidarToken} = require('../controlers/auth');

//*Endpoints
router.post('/new', crearUsuario);


router.post('/', loginUsuario );  //1.app 2.el tipo de peticion que esta esperando 'POST'y el / 3,segundo argumento es un callbak "fn de flecha" este se dispara con el requiest y el otro el response


router.get('/renew', revalidarToken);  //1.app 2.el  peticion que esta esperando GET y el / 3,segundo argumento es un callbak "fn de flecha" este se dispara con el requiest y el otro el response



//en lugar del app va a ser Router, para habilitar que esta ruta esta ok, debo exportar algo (la ruta) para uqe se implemente cunado se utilice ese midleware
//*EXPORTACION USADA EN NODE
  module.exports = router; // = es lo que quiero exportar en este caso el Router