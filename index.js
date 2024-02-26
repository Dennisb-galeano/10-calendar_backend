
const express = require('express'); // es como un import pero en NODE
require('dotenv').config();

/*console.log(process.env) 
va a mostrar TODOS los procesos que se estan corriendo en el ambiente NODE, en esta informacuin puedo obtener el puerto y al obtenerlo puedo cambiar en *escuchar peticiones(linea de abajo), 
*/

//*crear el servidor de express (la app)
  const app = express();
  


//quiero que cuando alguien ingrese al / se muestre el directorio publico ne este caso el index.html
// midleware en express: .use()  es una funcion que se ejecuta en el momento en que alguien hace una peticion a mi servidor (es una fn que se ejecuta csiempre  que pasa por algun lugar)

//*directorio Publico
app.use( express.static('public')); //establece un directiorio publico, es como el path, pero como estoy en la raiz del proyecto solo se le indica esa carpeta 'public'



//*configuracion de las rutas
  //todo: definir rutas de autenticacion //crear usuarios, login,token
  app.use('/api/auth',require('./routes/auth') ); //especificar la ruta donde qiero uqe se habilite el endpoint DICE QUE : toodo lo que  './routes/auth' va a exportar, se va habilitar en '/api/auth'
  //todo: CRUD: Eventos, para poder actualizar, borrar, crear eventos ... 


//*escuchar peticiones
app.listen(process.env.PORT, () => {  //el primer arg es el puerto donde quiero que corra, el segundo arg es un callback,"fn de flecha" este se va a ejecutar cuando el servidor de express este corriendo "arriba", node acepta casi cualqioer cosa actual de js. ac´´a se usan template string
  console.log(`Servidor corriendo en puerto ${process.env.PORT}`);  //ese PORT es la variable declarada en .env (el numero del puerto ), despues de establecer el ambiente de NODE
})