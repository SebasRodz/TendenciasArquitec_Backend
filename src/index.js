const express = require('express');
const res = require('express/lib/response');

// Inititializitations
const app = express();
// require('./database.js');

// Settings
app.set('port', process.env.PORT || 3000)

// Middlewares

// GLobal Variables

// Routes
app.get('/', (req, res) => {
    res.send("Welcome to API-REST");
})

// Static Files

// Server init
app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'))
})