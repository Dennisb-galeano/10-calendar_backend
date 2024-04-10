// Aca estara todo el CRUD ( Create, Read, Update, Delete)

/*  rutas especificas de los eventos estan en el index
        /api/events
*/        

const { Router} = require( 'express');
const {validarJWT} = require('../middlewares/validar-jwt'); //validar las rutas con el JWT, ES UN MIDLEWARE, Por lo tanto tengo uqe colocarla a cada unas de las peticiones
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controlers/events');

const router = Router();


//Obtener eventos
router.get('/', validarJWT, getEventos);


//Crear eventos
router.post('/', validarJWT, crearEvento);


//Actualizar evento - para probar en postman .. se dve manda un id cualquiera despues del /123123
router.put('/:id', validarJWT, actualizarEvento);



//Borrar evento
router.delete('/:id', validarJWT, eliminarEvento);


module.exports = router;