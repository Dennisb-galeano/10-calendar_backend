//cada peticion en routes > events.js va a realizar ok:true y el meg

const {response} = require ('express'); // de express requiero es response para igualarlo en la fn de getEvento
const Evento = require ('../models/Evento'); //no esta en llaves por que se hace la exportacion por defecto
const { body } = require('express-validator');

const getEventos = ( req, res = response) => {
  res.json({
    ok: true,
    msg: 'getEventos'
  })
}


const crearEvento = async ( req, res = response) => {
  /*debo asegurarme uqe la request tenga el evento, en el body del postman validar ( models > evento.js)  en crear evento(postamn) colocar valores en el body
   console.log( req.body);
  */
    const evento = new Evento( req.body ); //nueva instancia de mi modelo, lista para trabajar

    try {

      evento.user = req.uid //el ID del usuario esta en el en el req. en el objeto UID -- el user viene de Models > Evento el user es el id
     const eventoGuardado = await evento.save(); //para grabr el DB
      
      res.json({ //ok, 
        ok: true,
        evento: eventoGuardado //este es el evento que se guardo
      });


    } catch (error) {
      console.log(error)
      res.status(500).json({
        ok:false,
        msg: 'Hable con el administrador'
      });
    }
}


const actualizarEvento = ( req, res = response) => {

  res.json({
    ok: true,
    msg: 'actualizarEvento'
  })
}



const eliminarEvento = ( req, res = response) => {

  res.json({
    ok: true,
    msg: 'eliminarEvento'
  })
}


module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento
}


//importar los controladores de mis eventos en las rutas Routes > events.js