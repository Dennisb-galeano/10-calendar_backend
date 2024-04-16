//cada peticion en routes > events.js va a realizar ok:true y el meg

const { response } = require('express'); // de express requiero es response para igualarlo en la fn de getEvento
const Evento = require('../models/Evento'); //no esta en llaves por que se hace la exportacion por defecto
const { body } = require('express-validator');
const { populate } = require('dotenv');

const getEventos = async (req, res = response) => {

  //quiero retornar la lista detodos lo eventos 
  const eventos = await Evento.find() // el el find se pueden especificar condiciones 
    .populate('user', 'name');//rellenar los datos del usuario, (mandar la referencia que quiero rellenar), 

  res.json({
    ok: true,
    eventos
  })
}


const crearEvento = async (req, res = response) => {
  /*debo asegurarme uqe la request tenga el evento, en el body del postman validar ( models > evento.js)  en crear evento(postamn) colocar valores en el body
   console.log( req.body);
  */
  const evento = new Evento(req.body); //nueva instancia de mi modelo, lista para trabajar

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
      ok: false,
      msg: 'Hable con el administrador'
    });
  }
}


const actualizarEvento = async (req, res = response) => {

  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    //verificar si el  ya exite en la DB con mongoose
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({ //404, no existe el elemento en internet
        ok: false,
        msg: 'Evento no existe con ese ID'
      });
    }

    //verificar que la misma persona que creo el evento LO PUEDA EDITAR, si no es la misma NO lo deja EDITAR el evento
    if (evento.user.toString() !== uid) { //con e tostring, voy a obterner el ID y lo voy a comparar 
      return res.status(401).json({ //no autorizado
        ok: false,
        msg: 'No tiene el privilegio de editar este evento'
      });
    }

    //si llegoa sin error; es la misma persona uqe creo el evento y podra editar
    const nuevoEvento = {
      ...req.body, // desestructurar todo lo que biene en la request. body (seroa todo lo uqe me mandan del evento)
      user: uid
    }

    const eventoActualizado = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });  //que busque un elemento por el ID y uqe lo actualice (el EVENTO del ID que quiero act. , nueva darta que quiero guardar) , el tercer argumento, si no se coloca el new:true..muestra la ultima nota, antes de actualizar, si re doy send nuevamente al hacer la peticion me mostrata los cambios. si qioero SIEMPRE la informacion actualizada de inmediato, se coloca el tercer argumento
    res.json({
      ok: true,
      evento: eventoActualizado
    });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });

  }
}





const eliminarEvento = async (req, res = response) => {

  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    //verificar si el  ya exite en la DB con mongoose
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({ //404, no existe el elemento en internet
        ok: false,
        msg: 'Evento no existe con ese ID'
      });
    }

    //verificar que la misma persona que creo el evento LO PUEDA EDITAR, si no es la misma NO lo deja EDITAR el evento
    if (evento.user.toString() !== uid) { //con e tostring, voy a obterner el ID y lo voy a comparar 
      return res.status(401).json({ //no autorizado
        ok: false,
        msg: 'No tiene el privilegio de eliminar este evento'
      });
    }


     await Evento.findByIdAndDelete( eventoId );  //que busque un elemento por el ID y uqe lo actualice (el EVENTO del ID que quiero act. , nueva darta que quiero guardar) , el tercer argumento, si no se coloca el new:true..muestra la ultima nota, antes de actualizar, si re doy send nuevamente al hacer la peticion me mostrata los cambios. si qioero SIEMPRE la informacion actualizada de inmediato, se coloca el tercer argumento
       res.json({ ok: true });


  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: 'Hable con el administrador'
    });

  }

}


module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento
}


//importar los controladores de mis eventos en las rutas Routes > events.js