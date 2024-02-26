
//habilitar la ruta (index.js)
//para exportaren NODE 
//Se debe importar express
//configurar un router , ejecutar su fn. para llegar a esta ruta y pra recordar el path 

/* rutas de usuarios / auth  - ayuda a conocer las rutas del path -  la ruta que me muestra el  ok:true.

localhost:xxxx + /api/auth 
*/

const express = require('express');
const router = express.Router();


router.get('/', (req, res) => {  //1.app 2.el tipo de peticion que esta esperando en este caso GET y el / 3,segundo argumento es un callbak "fn de flecha" este se dispara con el requiest y el otro el response
  res.json({
    ok:true
  })
});


//en lugar del app va a ser Router, para habilitar que esta ruta esta ok, debo exportar algo (la ruta) para uqe se implemente cunado se utilice ese midleware
//*EXPORTACION USADA EN NODE
  module.exports = router; // = es lo que quiero exportar en este caso el Router