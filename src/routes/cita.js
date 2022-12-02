const express = require("express");
const userSchema = require("../models/user");
const doctorSchema = require("../models/doctors");
const citaSchema = require("../models/cita")
const { send } = require("express/lib/response");
const { utils } = require("mocha");
const cita = require("../models/cita");
const router = express.Router();

//Registro de cita, construccion...
router.post("/register", (req, res) => {
  const dni_paciente = req.body.dni_paciente;
  const dni_doctor = req.body.dni_doctor;

  const doctor = new userSchema;
  const cita = new citaSchema;

  userSchema.findOne(
    {
      dni: dni_paciente,
    },
    (err, user) => {
      if (err) {
        res.status(400).send({
          data: err,
          success: false,
        });
      } else if (!user) {
        res.status(400).send({
          data: err,
          success: false,
        })
      } else {
        cita.paciente = user._id;
        userSchema.findOne(
          {
            dni: dni_doctor,
          },
          (err, user) => {
            if (err) {
              res.status(400).send({
                data: err,
                success: false,
              })
            } else if (!user) {
              res.status(400).send({
                data: err,
                sucess: false,
              })
            } else {
              doctor._id = user._id;
              doctorSchema.findOne(
                {
                  doctor: doctor._id,
                },
                (err, doctor) => {
                  if (err) {
                    res.status(400).send({
                      data: err,
                      success: false,
                    })
                  } else if (!doctor) {
                    res.status(400).send({
                      data: err,
                      sucesss: false,
                    })
                  } else {
                    cita.doctor = doctor._id;
                    cita.save((err) => {
                      if (err) {
                        res.status(400).send({
                          data: err,
                          sucess:false,
                        });
                      } else {
                        res.status(200).send({
                          sucess: true,
                        });
                      }}
                    );
                  }
                }
              );
            }
          }
        );
      }
    }
  );
});


// Listar todas las citas
router.get("/listar", (req, res) => {
  citaSchema
    .find()
    .populate('paciente')
    .populate('doctor')
    .exec(function (err, cita) {
      if (cita.length === 0) {
        res.status(400).send({
          data: "No existen citas",
          sucess: false,
        })
      } else {
        res.status(200).send({
          data: cita,
          sucess: true,
        })
      }
    })
});

//Listar cita por paciente
router.get("/listar/paciente/:dni", (req, res) => {
  const {dni} = req.params;
  const paciente = new userSchema;

  userSchema.findOne(
    {
      dni: dni,
      tipoUsuario: 0  
    },
    (err, user) => {
      if (err) {
        res.status(400).send({
          data: err,
          sucess: false
        });
      } else if (!user) {
        res.status(400).send({
          data: "No existe paciente con ese DNI",
          sucess: false
        });
      } else {
        paciente._id = user._id;
        citaSchema.findOne(
          {
            paciente: paciente._id
          })
          .populate('User')
          .populate('Doctor')
          .exec(function (err, cita) {
            if (err) {
              res.status(400).send({
                data: err,
                sucess: false
              });
            } else if (cita) {
              res.status(200).send({
                data: cita,
                sucess: true
              })
            } else {
              res.status(400).send({
                data: "No existe cita para este paciente",
                sucess: false
              });
            }
          })
      }
    }
  );
});

//Listar citas por doctor
router.get("/listar/doctor/:dni", (req, res) => {
  const {dni} = req.params;
  const doctor = new userSchema;

  userSchema.findOne(
    {
      dni: dni,
      tipoUsuario: 1,
    },
    (err, user) => {
      if (err) {
        res.status(400).send({
          data: err,
          success: false,
        })
      } else if (!user) {
        res.status(400).send({
          data: "No existe doctor con DNI ingresado",
          success: false,
        })
      } else {
        doctor._id = user._id; 
        citaSchema.find(
          {
            doctor: doctor._id
          },)
          .populate('User')
          .populate('Doctor')
          .exec(function (err, cita) {
            if (err) {
              res.status(400).send({
                data: err,
                sucess: false,
              })
            } else if (cita.length === 0) {
              res.status(400).send({
                data: "No existen citas para este doctor",
                sucess: false
              })
            } else {
              res.status(200).send({
                data: cita,
                sucess: true
              })
            }
          })  
      }
    });
})
module.exports = router;