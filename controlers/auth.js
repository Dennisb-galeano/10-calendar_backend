//Carpeta controlers, estaran los controladores de mis rutas definidas en routes/auth
//son las fn definidas en routes/auth ( la ruta y la peticion quedan en routes/auth)
//peticiones
const express = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs'); //paquete que encripta las contraseñas para seg del usuaio
const {generarJwt} = require('../helpers/jwt'); //fn uqe rergresa una promesa y esa resuelve un string (que es el token )


const { validationResult} = require('express-validator'); //middleware para el manejo de errores, me los muestra


const crearUsuario = async(req, res = express.response) => {  //router.post('/new') de routes/auth //si quiero crear un nuevo usuario la peticion debe ser tipo POST, va a apuntar a '/new', seria el equivalente a /api/auth/new   (localhost:5174/api/auth/new)1.app 2.el tipo de peticion que esta esperando en este caso GET y el / 3,segundo argumento es un callbak "fn de flecha" este se dispara con el requiest y el otro el response
 
  //console.log( req.body);   el body de postman para mandar los datos {el objeto con la informacion, nombre, correo y contraseña}

  
  const  { email, password } = req.body; // este objeto ya tiene el email, emai.. se extraen los datos del body, ya podemos obtener la informacion 
  try {
    //mi modelo de Usuario ya tiene config para realizar busquedas en la db
    let usuario = await Usuario.findOne({ email}); //trabaja en base a promesas.
    if(usuario){
      return res.status(400).json({
        ok: false,
        msg: 'Usuario con ese correo ya existe'
      });
    }
      usuario = new Usuario( req.body ); //crear una nueva instancia de mi usuario
    
    //*Encriptar contraseña - bcrypt : validar doc - una función de hashing de contraseñas
          const salt = bcrypt.genSaltSync();  //salt: entre mas vueltas mas compleja la contraseña, si se deja asi () utiliza 10 por defecto., se puede escoger el numero de vueltas
          usuario.password = bcrypt.hashSync(password, salt); //para encriptar la contraseña
 
    //grabar en DB
    await usuario.save();

    //generar el JWT (json Web Token)
    const token = await generarJwt(usuario.id, usuario.name);
  
    //*Manejo de errores, 
      res.status(201).json({
      ok:true,
      uid: usuario.id,
      name: usuario.name,
      token
    });
    
  } catch (error) { //try, intenta hacer todo lo anterior,, si ni puede,, hace el catch
    console.log(error) //aca solo lo vere en el servidor, el mensaje msg: se le mostrara al cliente
    res.status(500).json({ //staatus 500, error interno
      ok: false,
      msg:'Comunicate con el administrador'
    }); 
  }
}


const loginUsuario = async (req, res=express.response ) => {  //router.post('/' )  de routes/auth //1.app 2.el tipo de peticion que esta esperando en este caso GET y el / 3,segundo argumento es un callbak "fn de flecha" este se dispara con el requiest y el otro el response
  const  {email, password} = (req.body);


try {
   //*confirmar si tenemos un usuario con ese Email
   const usuario = await Usuario.findOne({ email}); //trabaja en base a promesas.
   if(!usuario) { //si el usuario NO existe, error 400
     return res.status(400).json({
       ok: false,
       msg: 'Usuario con ese correo NO existe'
     });
   }

   //* Confirmar la contraseña
   const validPassword = bcrypt.compareSync( password, usuario.password); //recibe el passsword del usuario (el que puso es usuario) vs el almacenado en la db. Regresa true: si es valido O false, si no lo es.
   if( !validPassword) {
    return res.status(400).json({
      ok: false,
      msg: 'Contraseña incorrecta'
    });
   }

   //* Generar el TOKEN con- Json Web Token (JWT)
    const token = await generarJwt(usuario.id, usuario.name);

    res.json({   //mistrarle al uausior uqe todo va ok
      ok: true,
      uid: usuario.id,
      name: usuario.name,
      token
    })


} catch (error) {
  console.log(error) //aca solo lo vere en el servidor, el mensaje msg: se le mostrara al cliente
  res.status(500).json({ //staatus 500, error interno
    ok: false,
    msg:'Comunicate con el administrador'
  });  
}


}


const revalidarToken = async (req, res=express.response) => {  //router.get('/renew')de routes/auth  //1.app 2.el tipo de peticion que esta esperando en este caso GET y el / 3,segundo argumento es un callbak "fn de flecha" este se dispara con el requiest y el otro el response
  
  const uid = req.uid;
  const name = req.name;


// generar un nuevo JSON WEB TOKEN
const token = await generarJwt(uid, name);

  res.json({
    ok:true,
    uid, name,
    token
  })
}


//*EXPORTAR EN NODE, 

module.exports ={
  crearUsuario,
  loginUsuario,
  revalidarToken,


}

// las exportaciones en node:  module.exports = xxxxx, Como son varias fn a exportar se envia como un objeto
/*ayuda del intelicence: (opcional) = 
  1. requerir express 'no vuelve a descargar la libreria, solo trabaja con la que ya esta cargada'
  2. definir a resp = express.response)
*/

 
  /* ESTA VALIDACION SE VA A HACER CON EL express validator, en routes/auth
  if( name.length < 3 ){  //si, el return es false no se ejecuta nada 
    return res.status(400).json({ //responde estatus uqe se reguiera, en ese es 400(bad requiest)
      ok:false,
      msg: 'El nombre debe tener minimo 3 letras'
    });
  } 
  */


  //validar token que se genero en las pruebas de postman en JWT   https://jwt.io/, para validar fechas de expiracion y token valido.