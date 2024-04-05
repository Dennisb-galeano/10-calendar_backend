// (JWT) JSON WEB TOKEN - Estos helpers seran una funcion encargada de generar los JWT
//si manipulan el token se invalida

const jwt = require('jsonwebtoken');

const generarJwt = (uid, name) => { //recibe lo uqe necesito colocar como payload de mi token

  return new Promise((resolve, reject) => { //las promesas reciben estos callback siempre

    const payload = { uid, name }; //aca esta todo el proceso de la ejecucion del json Web Token

    jwt.sign( payload, process.env.SECRET_JWT_SEED, {   //el segundo argum. es (secretOrPrivateKey)palabra unica uqe le ayude al back a saber si es el token uqe yo genere. para esto ce crea una variable de entorno en .env es SECRET_JWT_SEED ... 
      expiresIn: '2h'//duracion del token 
    }, (err, token) => { //callback ueq se va a dispaara con un error si no se dipara,, y el token 
      
      if (err) {
        console.log(err);
        reject(' No se pudo generar el token');
      }
      resolve( token );

    })

  })
}


module.exports = {   //exportaciones en node
  generarJwt
}