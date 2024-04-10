//cada peticion en routes > events.js va a realizar ok:true y el meg

const {response} = require ('express'); // de express requiero es response para igualarlo en la fn de getEvento

const getEventos = ( req, res = response) => {
  res.json({
    ok: true,
    msg: 'getEventos'
  })
}


const crearEvento = ( req, res = response) => {

  res.json({
    ok: true,
    msg: 'crearEvento'
  })
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