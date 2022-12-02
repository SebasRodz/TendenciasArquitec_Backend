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
    const {tipo} = req.params;

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
    const {hora} = req.params;

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

  module.exports = router;