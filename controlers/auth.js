//Carpeta controlers, estaran los controladores de mis rutas definidas en routes/auth
//son las fn definidas en routes/auth ( la ruta y la peticion quedan en routes/auth)
//peticiones
const express = require('express');


const crearUsuario = (req, res= express.response) => {  //router.post('/new') de routes/auth //si quiero crear un nuevo usuario la peticion debe ser tipo POST, va a apuntar a '/new', seria el equivalente a /api/auth/new   (localhost:5174/api/auth/new)1.app 2.el tipo de peticion que esta esperando en este caso GET y el / 3,segundo argumento es un callbak "fn de flecha" este se dispara con el requiest y el otro el response
 
  //console.log( req.body);   el body de postman para mandar los datos {el objeto con la informacion, nombre, correo y contraseña}

  const  {name, email, password} = (req.body); //se extraen los datos del body, ya podemos obtener la informacion 
  
  if( name.length < 3 ){  //si, el return es false no se ejecuta nada 
    return res.status(400).json({ //responde estatus uqe se reguiera, en ese es 400(bad requiest)
      ok:false,
      msg: 'El nombre debe tener minimo 3 letras'
    });
  } 

  res.json({
    ok:true,
    msg:'registro',
    name,
    email,
    password
  })
}


const loginUsuario = (req, res=express.response ) => {  //router.post('/' )  de routes/auth //1.app 2.el tipo de peticion que esta esperando en este caso GET y el / 3,segundo argumento es un callbak "fn de flecha" este se dispara con el requiest y el otro el response
  const  {email, password} = (req.body);

  res.json({
    ok:true,
    msg: 'login',
    email,
    password
  })
}



const revalidarToken = (req, res=express.response) => {  //router.get('/renew')de routes/auth  //1.app 2.el tipo de peticion que esta esperando en este caso GET y el / 3,segundo argumento es un callbak "fn de flecha" este se dispara con el requiest y el otro el response
  res.json({
    ok:true,
    msg: 'REVALIDAR renew del token'
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