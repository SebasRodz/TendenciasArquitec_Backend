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
            res.status(500).send({data: err, success: false});
        } else {
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
            res.status(500).send({data: err, success: false});
        } else if(!user) {
            res.status(500).send({data: err, success: false});
        } else {
            user.isCorrectPassword(password, (err, result) =>{
                if(err) {
                    res.status(500).send({data: err, success: false});
                } else if(result) {
                    res.status(200).send({data: user, success: true});
                } else {
                    res.status(500).send({data: err, success: false});
                }
            });
        }
    });
});

module.exports = router;