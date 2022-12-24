const express = require("express");
const userSchema = require("../models/user");
const doctorSchema = require("../models/doctors");
const citaSchema = require("../models/cita")
const { send } = require("express/lib/response");
const { utils } = require("mocha");
const cita = require("../models/cita");
const nodemailer = require("nodemailer");
const { config } = require("../config");
const hbs = require('nodemailer-express-handlebars');
const router = express.Router();

//Registro de cita, construccion...
router.post("/register", (req, res) => {
  const dni_paciente = req.body.dni_paciente;
  const dni_doctor = req.body.dni_doctor;

  const doctor = new userSchema;
  const cita = new citaSchema;
  var transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: config.user_mail,
        pass: config.user_pass
    }
  });
  transporter.use('compile', hbs({
    viewEngine: 'express-handlebars',
    viewPath: './src/templates/',
  }));

  var mailoptions = {
    from: "Remitente",
    to: "",
    subject: "Cita",
    text: "Su cita ha sido registrada con exito",
    template: 'cita',
    context: {
      name: "",
      doctor: "",
      turno: "",
      especialidad: "",
    }
  };

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
        mailoptions.to = user.correo;
        mailoptions.context.name = user.nombre;
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
              mailoptions.context.doctor = user.nombre;
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
                    cita.especialidad = doctor.especialidad;
                    mailoptions.context.especialidad = doctor.especialidad;
                    mailoptions.context.turno = doctor.turno;
                    cita.turno = doctor.turno;
                    cita.status = 0;
                    cita.save((err) => {
                      if (err) {
                        res.status(400).send({
                          data: err,
                          sucess:false,
                        });
                      } else {
                        transporter.sendMail(mailoptions, function (error, info) {
                          if (error) {
                            console.log(error);
                            res.status(400).send({
                              data: error,
                              sucess: false,
                            });
                          } else {
                            console.log("Email enviado: " + info.response);
                          }
                        });
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
        citaSchema.find(
          {
            paciente: paciente._id
          })
          .populate('paciente')
          .populate({
            path: 'doctor',
            populate: {
              path: 'doctor'
            }
          })
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
                data: "No existe doctor con DNI ingresado",
                success: false,
              })
            } else {
              citaSchema.find(
                {
                  doctor: doctor._id,
                })
                .populate('paciente')
                .populate('doctor')
                .exec(function (err, cita) {
                  if (err) {
                    res.status(400).send({
                      data: err,
                      success: false,
                    })
                  } else if (cita) {
                    res.status(200).send({
                      data: cita,
                      success: true,
                    })
                  } else {
                    res.status(400).send({
                      data: "No existen citas para este doctor",
                      success: false,
                    })
                  }
                })
            }
          })
      }
    });
})
router.post("/actualizar/status", (req, res) => {
    citaSchema.findById(req.body.id, (err, cita) => {
      if (err) {
        res.status(400).send({
          data: err,
          success: false,
        });
      } else if (!cita) {
        res.status(400).send({
          data: "No existe cita con ese ID",
          success: false,
        });
      } else {
        cita.status = req.body.status;
        cita.save((err) => {
          if (err) {
            res.status(400).send({
              data: err,
              success: false,
            });
          } else {
            res.status(200).send({
              success: true,
            });
          }
        });
      }
    });
});
module.exports = router;