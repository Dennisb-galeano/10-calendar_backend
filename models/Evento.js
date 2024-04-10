
//MODELO:
//crear un EVENTO en la base de datos., como quiero que luzca mi usuario. MONGOOSE
//se exporta para trabajar el el evento
//este es mi modelo, donde realizo posteos actualizaciones obtener informacion ...

const { Schema, model, default: mongoose } = require('mongoose'); //importacion de mongoose. se va a extraer el Schema(la informacion que quiero dejar en la DB ) y el model


const EventoSchema = Schema({  //objeto con la config que necesito, este objeto tiene lo que va a recibir mi calendario

  title: {
    type: String,
    require: true,
  },

  notes: {
    type: String,
  },

  start: { //fecha de inicio
    type: Date,
    require: true
  },

  end: { //fecha de fin
    type: Date,
    require: true
  },

  user: { //el usuario que creo el registro, saber quien grabo ese registro
    type: Schema.Types.ObjectId, //de esta forma se le dice a mongoose que es una referencia, y se especifica >
    ref: 'Usuario' // este es el nombre del otro Schema
  }
});

module.exports = mongoose.model('Usuario', EventoSchema );  //doc mongoose de model. el model se va a llamar 'usuario', y el esuqema que va a usar sera UsuarioSchema