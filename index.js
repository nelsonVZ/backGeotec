const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { dbConection } = require('./config/database');
//Creamos el servidor express
const app = express();

//Configuracion de cors
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Conexion a la BD
dbConection();

//Rutas de la API
app.use('/api/usuarios', require('./routes/usuarios.router'));
app.use('/api/login', require('./routes/auth_router'));

//Levantamos el servidor
app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});