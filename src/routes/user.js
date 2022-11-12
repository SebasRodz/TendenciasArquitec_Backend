const express = require("express");
const userSchema = require("../models/user");

const router = express.Router();

//Probar cosas
router.get("/probar", (req, res) => {
    res.send("Probando ando");
})

//Crear usuario POST
router.post("/register", (req, res) => {
    const user = userSchema(req.body);
   
    user
      .save(err =>{
        if(err){
            console.log("registro fallido");
            res.status(500).send({data: err, success: false});
        } else {
            console.log("Registro Correcto");
            res.status(200).send({data: user, success: true});
        }
      });
});  

// Autenticar usuario POST
router.post("/auth", (req, res) => {
    const {dni, password} = req.body;

    userSchema
      .findOne({dni}, (err, user) => {
        if(err){
            console.log("error 1 auth");
            res.status(500).send({data: err, success: false});
        } else if(!user) {
            console.log("error 2 auth");
            res.status(500).send({data: err, success: false});
        } else {
            user.isCorrectPassword(password, (err, result) =>{
                if(err) {
                    console.log("error 3 auth");
                    res.status(500).send({data: err, success: false});
                } else if(result) {
                    console.log("error 4 auth");
                    res.status(200).send({data: user, success: true});
                } else {
                    console.log("error 5 auth");
                    res.status(500).send({data: err, success: false});
                }
            });
        }
    });
});

module.exports = router;