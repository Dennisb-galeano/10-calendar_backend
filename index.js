
 // IMPORTACIONES EN  en NODE
const express = require('express');
require('dotenv').config();
const {dbconection} = require('./dataBase/config');
const cors = require('cors');


/*console.log(process.env)  
va a mostrar TODOS los procesos que se estan corriendo en el ambiente NODE, en esta informacuin puedo obtener el puerto y al obtenerlo puedo cambiar en *escuchar peticiones(linea de abajo), de aca se saca el valor del puerto PORT
*/

//*crear el servidor de express (la app)
  const app = express();

//*Base de datos  
dbconection();

 //* CORS - LIBRERIA para proteger las rutas de mi API
 app.use( cors());





//quiero que cuando alguien ingrese al / se muestre el directorio publico ne este caso el index.html
// midleware en express: .use()  es una funcion que se ejecuta en el momento en que alguien hace una peticion a mi servidor (es una fn que se ejecuta csiempre  que pasa por algun lugar)

//*directorio Publico
app.use( express.static('public')); //establece un directiorio publico, es como el path, pero como estoy en la raiz del proyecto solo se le indica esa carpeta 'public'


//*express - lectura parcear el body
app.use(express.json() ); //midleware, viene de express.json-- las peticiones que vienen en formato JSON se van procesar ahi y se va a extraer el contenido, USARLO EN EL AUHT  de controllers

//*configuracion de las rutas
  app.use('/api/auth',require('./routes/auth') ); //especificar la ruta donde qiero uqe se habilite el endpoint DICE QUE : toodo lo que  './routes/auth' va a exportar, se va habilitar en '/api/auth'
  //todo: CRUD: Eventos, para poder actualizar, borrar, crear eventos ... 
  app.use('/api/events',require('./routes/events') ); // ruta de los eventos, va a requerir las rutas que tengo en /events
  

//*escuchar peticiones
app.listen(process.env.PORT, () => {  //el primer arg es el puerto donde quiero que corra, el segundo arg es un callback,"fn de flecha" este se va a ejecutar cuando el servidor de express este corriendo "arriba", node acepta casi cualqioer cosa actual de js. ac´´a se usan template string
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);  //ese PORT es la variable declarada en .env (el numero del puerto ), despues de establecer el ambiente de NODE
})


//CORS - es un middleware, se habilita despues desde el backend, el postman lo deja pasar.