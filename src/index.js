import express from 'express';
import consign from 'consign';
const app = express();

//Esto sirve para separar toda la configuracion en otros archivos y ordenarlo
//mejor todo el proyecto
consign({
    cwd: __dirname
})
  .include('libs/config.js') // Este contiene la configuracion de la base de datos
  .then('db.js') //devuelve la configuracion y los modelos de la base de datos
  .then('libs/middlewares.js') //Esto es tan solo la configuracion de express
  .then('routes') //Este solo contiene las rutas de los servicios
  .then('libs/boot.js') //Este arranca el servidor
  .into(app)//todos necesitan tener app=express inicializado se lo envio como parametro