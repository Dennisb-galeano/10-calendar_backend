
//Validar los token - JWT (JSON Web Token)
//Los midlewares en express no son mas que fn que se va a ejecutaar antes que cualquier otra cosa

const { response } = require('express');
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => { // el next es la fn que voy a llamar si el token uqe voy a recibir es correcto

  //pedir x-token de los headers en postman

  const token = req.header('x-token');//leer los headers (express tiene las fn para haerlos)
  // console.log(token); validar si esta recibienso el token ok
  if (!token) { //si el token esta null o undefined
    return res.status(401).json({ // 401(no esta autenticado)
      ok: false,
      msg: 'No hay token en la peticion'
    });
  }

  try {
    const {uid,name} = jwt.verify(  //varificacion del token!  vamos a extraer el payload por que me interesa saber el uid del usuario
      token,
      process.env.SECRET_JWT_SEED// FIRMA DEL TOKEN. la variable de entorno o secretOrPublicKey, (no hay que mostrar esta variable por que otra persona podria autenticarse en la app)
    );
    // tsi todo sale ok,, avanza hasta llamar el NEXT
    // console.log(payload);


    req.uid = uid;
    req.name = name;

  } catch (error) { //solo se va a disparar si la autenticacion del token falla
    return res.status(401).json({
      ok: false,
      msg: 'Token no valido'
    });
  }


  next(); //este se llama para asegurar que ..si todo esta ok. realice lo que sigue
}



module.exports = {
  validarJWT
}