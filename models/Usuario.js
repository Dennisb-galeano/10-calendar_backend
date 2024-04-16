//crear un usuario en la base de datos., como quiero que luzca mi usuario.
//se exporta para cuando queira trabajar con usuatios

const { Schema, model, default: mongoose } = require('mongoose'); //importacion de mongoose. se va a extraer el Schema(la informacion que quiero dejar en la DB ) y el model


const UsuarioSchema = Schema({  //objeto con la config que necesito

  name: { // la informacion que se guarta es de tipo string, y es obligatorio
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true //le estoy diciendo que no pueden haber correos duplicados 
  },
  password: {
    type: String,
    required: true
  }

});

module.exports = mongoose.model('Usuario', UsuarioSchema );  //doc mongoose de model. el model se va a llamar 'usuario', y el esuqema que va a usar sera UsuarioSchema


// mongoose.model