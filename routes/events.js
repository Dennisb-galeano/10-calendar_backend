// Aca estara todo el CRUD ( Create, Read, Update, Delete)

/*  rutas especificas de los eventos estan en el index
        /api/events
*/        

const { Router} = require( 'express');
const {check} = require ('express-validator'); //midleware

const { isDate} = require('../helpers/isDate');
const {validarCampos} = require ('../middlewares/validar_campos'); //midleware uqe se llama despues de todos los check, asi, si hay un error no va a volver a pasar, se usa en router.post
const {validarJWT} = require('../middlewares/validar-jwt'); //validar las rutas con el JWT, ES UN MIDLEWARE, Por lo tanto tengo uqe colocarla a cada unas de las peticiones
const {getEventos, crearEvento, actualizarEvento, eliminarEvento} = require('../controlers/events');

const router = Router();


//Obtener eventos
router.get('/', validarJWT, getEventos);


//*Crear eventos
//Validaciones !..  el evento con el check de express validator, son midlewares y por eso se coloca como un arreglo
router.post(
        '/', 
        [
           check('title', 'El titulo es obligatorio').not().isEmpty(), //check, midleware de express validator, validar el titulo "obligatorio" __ .not().isEmpty() "siempre tenga informacion"
           check('start', 'Fecha de inicio es obligatoria').custom( isDate) ,     //express validator no valida fechas, pero se pueden hacer validaciones personalizadas con el check del express validator. el custom esta esperando una fn o un callback para realizar la validacion, (se crea en los helpers > isDate.js)
           check('end', 'Fecha de finalizacion es obligatoria').custom( isDate),     
           validarCampos     //si hay algun error de aca no pasa
        ],
        
        validarJWT,
        crearEvento,
        
        );


//Actualizar evento - para probar en postman .. se dve manda un id cualquiera despues del /123123
router.put('/:id', validarJWT, actualizarEvento);



//Borrar evento
router.delete('/:id', validarJWT, eliminarEvento);


module.exports = router;