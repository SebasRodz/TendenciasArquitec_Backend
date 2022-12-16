const express = require('express');
const res = require('express/lib/response');
const cors = require('cors');

const userRoutes = require("./routes/user"); 
const userDni = require("./routes/dni");
const doctorRoutes = require("./routes/doctor");
const citaRoutes = require("./routes/cita")

// Inititializitations
const app = express();
require('./database.js');

// Middlewares
app.use(cors());
app.use(express.json());
app.use('/api/users', userRoutes);
app.use('/api/doctor', doctorRoutes);
app.use('/api/cita', citaRoutes)
app.use('/api', userDni);

// Global Variables

// Routes
app.get('/', (req, res) => {
    res.send("Welcome to API-REST");
});

// Static Files

//Export
module.exports = app;