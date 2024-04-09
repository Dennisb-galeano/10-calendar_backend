
//este archivo tiene toda la configuracion que voy a tener para conectarme a mi basee de datos
//aca voy a usar MONGOOSE

  const mongoose = require('mongoose');

  //fn que se va a ejecutar en mi index
  const dbconection = async() =>{

    try{ // mostarr error por si no tengo db 

      await mongoose.connect(process.env.DB_CNN );//(promesa)    doc de mongoose, se cambia la url de la doc de mongoose, por el valor de la nueva variable de entorno creada en .env

        console.log('DB ONLINE'); // conexion de node a mongo atlas
   
   
   
    }catch( error){
        console.log(error);
        throw new Error('Error a la hora de inicializar base de datos.')

    }
  }


  //Exportar la fn al index
  module.exports = {
    dbconection
  }
