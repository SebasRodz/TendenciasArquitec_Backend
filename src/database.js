const mongoose = require('mongoose');
require('dotenv').config();

// Connection
mongoose
 .connect(process.env.MONGODB_URI)
 .then(() => console.log("Conectado a la Base de Datos"))
 .catch((error) => console.error(error));
