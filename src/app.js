const express = require('express');
const res = require('express/lib/response');
const userRoutes = require("./routes/user"); 
const userDni = require("./routes/dni");

// Inititializitations
const app = express();
require('./database.js');

// Middlewares
app.use(express.json());
app.use('/api', userRoutes);
app.use('/api', userDni);

// Global Variables

// Routes
app.get('/', (req, res) => {
    res.send("Welcome to API-REST");
});

// Static Files

//Export
module.exports = app;