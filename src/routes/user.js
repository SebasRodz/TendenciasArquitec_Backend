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
            console.log(err);
            res.status(500).send("ERROR EN REGISTRO");
        } else {
            res.status(200).send("USUARIO REGISTRADO");
        }
      });
});  

// Autenticar usuario POST
router.post("/auth", (req, res) => {
    const {dni, password} = req.body;

    userSchema
      .findOne({dni}, (err, user) => {
        if(err){
            console.log(err)
            res.status(500).send("ERROR EN AUTENTICACION 1");
        } else if(!user) {
            res.status(500).send("USUARIO NO EXISTE");
        } else {
            console.log(user);
            user.isCorrectPassword(password, (err, result) =>{
                if(err) {
                    console.log(err);
                    res.status(500).send("EROOR EN AUTENTICACION 2");
                } else if(result) {
                    res.status(200).send("USUARIO AUTENTICADO");
                } else {
                    res.status(500).send("USUARIO Y/O CONTRASEÑA INCORRECTA");
                }
            });
        }
    });
});

module.exports = router;