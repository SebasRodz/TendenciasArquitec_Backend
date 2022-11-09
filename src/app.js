const express = require('express');
const res = require('express/lib/response');

// Inititializitations
const app = express();
// require('./database.js');

// Middlewares

// GLobal Variables

// Routes
app.get('/', (req, res) => {
    res.send("Welcome to API-REST");
})

// Static Files

//Export
module.exports = app;