const express = require("express");
const userSchema = require("../models/user");
const doctorSchema = require("../models/doctors");
const { send } = require("express/lib/response");
const { utils } = require("mocha");
const router = express.Router();

router.post("/register", (req, res) => {
    const user = new userSchema;
    const doctor = new doctorSchema;
  
    user.apellidoP = req.body.apellidoP;
    user.apellidoM = req.body.apellidoM;
    user.password = req.body.password;
    user.correo = req.body.correo;
    user.direccion = req.body.direccion;
    user.dni = req.body.dni;
    user.fechanac = req.body.fechanac;
    user.nombre = req.body.nombre;
    user.sexo = req.body.sexo;
    user.tipoUsuario = 1;
  
    doctor.especialidad = req.body.especialidad;
    doctor.turno = req.body.turno;
  
    const dni = user.dni;
  
    user.save((err) => {
      if (err) {
        res.status(500).send({
          data: err,
          success: false,
        });
      } else {
        userSchema.findOne(
          {
            dni
          },
          (err, user) => {
            if (err) {
              res.status(500).send({
                data: err,
                success: false,
              });
            } else if (!user) {
              res.status(500).send({
                data: err,
                success: false,
              });
            } else if (res) {
              doctor.doctor = user._id;
              doctor.save((err) => {
                if (err) {
                  res.status(500).send({
                    data: err,
                    success: false,
                  });
                } else {
                  res.status(200).send({
                    data_user: user,
                    data_doctor: doctor,
                    success: true,
                  });
                }
              })
            } else {
                res.status(500).send({
                  data: err,
                  success: false,
                });
              }
            });
      }
    });
  });
  
  router.get("/listar", (req, res) => {
    doctorSchema
      .find()
      .populate('doctor')
      .exec(function (err, user) {
        if (!user) {
          res.status(400).send({
            data: err,
            success: false,
          })
        } else {
          res.status(200).send({
            data: user,
            success: true,
          })
        }
      });
  })

  router.get("/listar/especialidad/:tipo", (req, res) => {
    var {tipo} = req.params;
    tipo = tipo.toUpperCase();

    doctorSchema
      .find({especialidad: tipo})
      .populate('doctor')
      .exec(function (err, user) {
        if (!user) {
          res.status(400).send({
            data: err,
            success: false,
          })
        } else {
          res.status(200).send({
            data: user,
            success: true,
          })
        }
      });
  })

  router.get("/listar/turno/:hora", (req, res) => {
    var {hora} = req.params;
    hora = hora.toUpperCase();

    doctorSchema
      .find({turno: hora})
      .populate('doctor')
      .exec(function (err, user) {
        if (!user) {
          res.status(400).send({
            data: err,
            success: false,
          })
        } else {
          res.status(200).send({
            data: user,
            success: true,
          })
        }
      });
  })

  router.get("/listar/todo/:tipo/:hora", (req, res) => {
    var {tipo, hora} = req.params;
    tipo = tipo.toUpperCase();
    hora = hora.toUpperCase();

    console.log(tipo, hora);

    doctorSchema
      .find({
        turno: hora,
        especialidad: tipo
      })
      .populate('doctor')
      .exec(function (err, doctor) {
        if (err) {
          res.status(400).send({
            error: err,
            sucess: false
          });
        } else if (doctor.length === 0) {
          res.status(200).send({
            data: "No hay doctores con estas caracteristicas",
            sucess: true
          })
        } else {
          res.status(200).send({
            data: doctor,
            sucess: true
          })
        }
      })
  })

  module.exports = router;