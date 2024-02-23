
const express = require('express'); // es como un import pero en NODE

//*crear el servidor de express (la app)
  const app = express();
  
//*escuchar peticiones
app.listen(5174, () => {  //el primer arg es el puerto donde quiero que corra, el segundo arg es un callback,"fn de flecha" este se va a ejecutar cuando el servidor de express este corriendo "arriba", node acepta casi cualqioer cosa actual de js. ac´´a se usan template string
  console.log(`Servidor corriendo en puerto ${5174} `);
})

//*configuracion de las rutas
app.get('/', (req, res) => {  //1.app 2.el tipo de peticion que esta esperando en este caso GET y el / 3,segundo argumento es un callbak "fn de flecha" este se dispara con el requiest y el otro el response
  //necesito resonderle al cliente 
  // console.log('se reqiere el /');
  res.json({
    ok:true
  })
});