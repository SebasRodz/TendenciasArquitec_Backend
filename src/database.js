const mongoose = require('mongoose');
const { config } = require("./config");

// Uso de base de datos para produccion
// try {const db = mongoose.connect(config.db);} catch (error) {console.error(error);}

// Uso de base de datos para developer
try {const db = mongoose.connect(config.db_dev);} catch (error) {console.error(error);}

// Uso de base de datos para testeo
// try {const db = mongoose.connect(config.db_test);} catch (error) {console.error(error);}

mongoose.connection.on("connected", () => {
    console.log("Mongoose is connected");
});
  
mongoose.connection.on("disconnected", () => {
    console.log("Mongoose is disconnected");
});