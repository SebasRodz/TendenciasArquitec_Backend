const express = require("express");
const userSchema = require("../models/user");
const doctorSchema = require("../models/doctors");
const { send } = require("express/lib/response");
const { utils } = require("mocha");
const router = express.Router();

/**
 * @openapi
 * /api/doctor/register:
 *   post:
 *     tags:
 *       - Doctores
 *     summary: Registro de doctor.
 *     description: Se registra un doctor con un JSON definido y requerido.
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 apellidoP:
 *                   type: string
 *                   example: "Perez"
 *                 apellidoM:
 *                   type: string
 *                   example: "Perez"
 *                 password:
 *                   type: string
 *                   example: "xxxxxxx"
 *                 correo:
 *                   type: string
 *                   example: "mail@mail.com"
 *                 direccion:
 *                   type: string
 *                   example: "av 123"
 *                 dni:
 *                   type: string
 *                   example: "12345678"
 *                 fechanac:
 *                   type: string
 *                   example: "2000-12-23T00:00:00"
 *                 nombre:
 *                   type: string
 *                   example: "Jose"
 *                 sexo:
 *                   type: string
 *                   example: "M"
 *                 especialidad:
 *                   type: string
 *                   example: "Podologo"
 *                 turno:
 *                   type: string
 *                   example: "Noche"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data_user:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "639153c694280c48d15b5315"
 *                     apellidoP:
 *                       type: string
 *                       example: "Perez"
 *                     apellidoM:
 *                       type: string
 *                       example: "Perez"
 *                     password:
 *                       type: string
 *                       example: "$2a$10$4mrSiR88BEZCDABUnXuU9OvHUe2b/t7.6ATQU8cMnyBIwSxgjLy1a"
 *                     correo:
 *                       type: string
 *                       example: "mail1@mail.com"
 *                     direccion:
 *                       type: string
 *                       example: "av 123"
 *                     dni:
 *                       type: string
 *                       example: "12345678"
 *                     fechanac:
 *                       type: string
 *                       example: "2000-12-23T00:00:00"
 *                     nombre:
 *                       type: string
 *                       example: "Jose"
 *                     sexo:
 *                       type: string
 *                       example: "M"
 *                     tipoUsuario:
 *                       type: number
 *                       example: 1
 *                 data_doctor:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "639153c694280c48d15b5316"
 *                     especialidad:
 *                       type: string
 *                       example: "PODOLOGO" 
 *                     turno:
 *                       type: string
 *                       example: "NOCHE"
 *                     doctor:
 *                       type: string
 *                       example: "639153c694280c48d15b5315"                    
 *                 success:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "Error"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
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

    especialidad_sub = req.body.especialidad;
    turno_sub = req.body.turno;

    if (especialidad_sub == undefined) {
      return res.status(400).send({
          data: "Especialidad no definida",
          success: false
        })
    } else if (turno_sub == undefined) {
      return res.status(400).send({
          data: "Turno no definido",
          success: false
      })
    }

    doctor.especialidad = especialidad_sub.toUpperCase();
    doctor.turno = turno_sub.toUpperCase();

    user.save((err) => {
      if (err) {
        res.status(400).send({
          data: err,
          success: false,
        });
      } else {
        doctor.doctor = user._id;
        doctor.save((err) => {
          if (err) {
            res.status(500).send({
              data: err,
              success: false
            });
          } else {
            res.status(200).send({
              data_user: user,
              data_doctor: doctor,
              success: true
            });
          }
        });
      } 
    });
});
  
  /**
 * @openapi
 * /api/doctor/listar:
 *   get:
 *     tags:
 *       - Doctores
 *     summary: Lista el total de doctores.
 *     description: Lista el total de doctores existentes.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object  
 *                   properties: 
 *                     _id:
 *                       type: string
 *                       example: "63869839abc2dc33ffd59886"
 *                     especialidad:
 *                       type: string
 *                       example: "PODOLOGO"  
 *                     turno:
 *                       type: string
 *                       example: "NOCHE"
 *                     doctor:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "63869839abc2dc33ffd59885"
 *                         apellidoP:
 *                           type: string
 *                           example: "DOCTOR"
 *                         apellidoM:
 *                           type: string
 *                           example: "DOCTOR"
 *                         password:
 *                           type: string
 *                           example: "$2a$10$iI1H852CpWi75s0dyL8aHeXD0T2TW3lfalor9.0JGszPx9HY6PXSG"
 *                         correo:
 *                           type: string
 *                           example: "doctor@gmail.com"
 *                         direccion:
 *                           type: string
 *                           example: "DOCTOR"
 *                         dni:
 *                           type: string
 *                           example: "00000001"
 *                         fechanac:
 *                           type: string
 *                           example: "2004-04-13T00:00:00"
 *                         nombre:
 *                           type: string
 *                           example: "DOCTOR DOCTOR"
 *                         sexo:
 *                           type: string
 *                           example: "M"
 *                         tipoUsuario:
 *                           type: number
 *                           example: 1 
 *                 success:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "Error"    
 *                 success:
 *                   type: boolean
 *                   example: false             
 */
  router.get("/listar", (req, res) => {
    doctorSchema
      .find()
      .populate('doctor')
      .exec(function (err, doctor) {
        if (err) {
          res.status(500).send({
            data: err,
            success: false
          })
        } else if (doctor.length === 0) {
          res.status(200).send({
            data: "No existen doctores en este momento",
            success: true
          })
        } else {
          res.status(200).send({
            data: doctor,
            success: true
          })
        }
      });
  })

   /**
 * @openapi
 * /api/doctor/listar/especialidad/{tipo}:
 *   get:
 *     tags:
 *       - Doctores
 *     summary: Lista a los doctores por su especialidad.
 *     description: Retorna cada doctor con su respectivo JSON respecto al parametro de especialidad.
 *     parameters:
 *     - in: path
 *       name: tipo
 *       schema: 
 *         type: string
 *       required: true
 *       description: Especialidad de los doctores a listar.
 *     responses:
 *       200:
 *         description: Operacion satisfactoria con resultados.
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object  
 *                   properties: 
 *                     _id:
 *                       type: string
 *                       example: "63869839abc2dc33ffd59886"
 *                     especialidad:
 *                       type: string
 *                       example: "PODOLOGO"  
 *                     turno:
 *                       type: string
 *                       example: "NOCHE"
 *                     doctor:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "63869839abc2dc33ffd59885"
 *                         apellidoP:
 *                           type: string
 *                           example: "DOCTOR"
 *                         apellidoM:
 *                           type: string
 *                           example: "DOCTOR"
 *                         password:
 *                           type: string
 *                           example: "$2a$10$iI1H852CpWi75s0dyL8aHeXD0T2TW3lfalor9.0JGszPx9HY6PXSG"
 *                         correo:
 *                           type: string
 *                           example: "doctor@gmail.com"
 *                         direccion:
 *                           type: string
 *                           example: "DOCTOR"
 *                         dni:
 *                           type: string
 *                           example: "00000001"
 *                         fechanac:
 *                           type: string
 *                           example: "2004-04-13T00:00:00"
 *                         nombre:
 *                           type: string
 *                           example: "DOCTOR DOCTOR"
 *                         sexo:
 *                           type: string
 *                           example: "M"
 *                         tipoUsuario:
 *                           type: number
 *                           example: 1 
 *                 success:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "error"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
  router.get("/listar/especialidad/:tipo", (req, res) => {
    var {tipo} = req.params;
    tipo = tipo.toUpperCase();

    doctorSchema
      .find({especialidad: tipo})
      .populate('doctor')
      .exec(function (err, doctor) {
        if (err) {
          res.status(500).send({
            data: err,
            success: false,
          })
        } else if (doctor.length === 0) {
          res.status(200).send({
            data: "No existen doctores con esa especialidad",
            success: true
          })
        } else {
          res.status(200).send({
            data: doctor,
            success: true,
          })
        }
      });
  })

   /**
 * @openapi
 * /api/doctor/listar/turno/{hora}:
 *   get:
 *     tags:
 *       - Doctores
 *     summary: Lista a los doctores por su turno.
 *     description: Retorna cada doctor con su respectivo JSON respecto al horario de trabajo.
 *     parameters:
 *     - in: path
 *       name: hora
 *       schema: 
 *         type: string
 *       required: true
 *       description: Turno de los doctores a listar.
 *     responses:
 *       200:
 *         description: Operacion satisfactoria con resultados.
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object  
 *                   properties: 
 *                     _id:
 *                       type: string
 *                       example: "63869839abc2dc33ffd59886"
 *                     especialidad:
 *                       type: string
 *                       example: "PODOLOGO"  
 *                     turno:
 *                       type: string
 *                       example: "NOCHE"
 *                     doctor:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "63869839abc2dc33ffd59885"
 *                         apellidoP:
 *                           type: string
 *                           example: "DOCTOR"
 *                         apellidoM:
 *                           type: string
 *                           example: "DOCTOR"
 *                         password:
 *                           type: string
 *                           example: "$2a$10$iI1H852CpWi75s0dyL8aHeXD0T2TW3lfalor9.0JGszPx9HY6PXSG"
 *                         correo:
 *                           type: string
 *                           example: "doctor@gmail.com"
 *                         direccion:
 *                           type: string
 *                           example: "DOCTOR"
 *                         dni:
 *                           type: string
 *                           example: "00000001"
 *                         fechanac:
 *                           type: string
 *                           example: "2004-04-13T00:00:00"
 *                         nombre:
 *                           type: string
 *                           example: "DOCTOR DOCTOR"
 *                         sexo:
 *                           type: string
 *                           example: "M"
 *                         tipoUsuario:
 *                           type: number
 *                           example: 1 
 *                 success:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "error"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
  router.get("/listar/turno/:hora", (req, res) => {
    var {hora} = req.params;
    hora = hora.toUpperCase();

    doctorSchema
      .find({turno: hora})
      .populate('doctor')
      .exec(function (err, doctor) {
        if (err) {
          res.status(500).send({
            data: err,
            success: false,
          })
        } else if (doctor.length === 0) {
          res.status(200).send({
            data: "No existen doctores con ese horario",
            success: true
          })
        } else {  
          res.status(200).send({
            data: doctor,
            success: true,
          })
        }
      });
  })

   /**
 * @openapi
 * /api/doctor/listar/todo/{tipo}/{hora}:
 *   get:
 *     tags:
 *       - Doctores
 *     summary: Lista a los doctores por su especialidad y turno.
 *     description: Retorna cada doctor con su respectivo JSON respecto al parametro de especialidad y de turno.
 *     parameters:
 *     - in: path
 *       name: tipo
 *       schema: 
 *         type: string
 *       required: true
 *       description: Especialidad de los doctores a listar.
 *     - in: path
 *       name: hora
 *       schema: 
 *         type: string
 *       required: true
 *       description: Turno de los doctores a listar.
 *     responses:
 *       200:
 *         description: Operacion satisfactoria con resultados.
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object  
 *                   properties: 
 *                     _id:
 *                       type: string
 *                       example: "63869839abc2dc33ffd59886"
 *                     especialidad:
 *                       type: string
 *                       example: "PODOLOGO"  
 *                     turno:
 *                       type: string
 *                       example: "NOCHE"
 *                     doctor:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: "63869839abc2dc33ffd59885"
 *                         apellidoP:
 *                           type: string
 *                           example: "DOCTOR"
 *                         apellidoM:
 *                           type: string
 *                           example: "DOCTOR"
 *                         password:
 *                           type: string
 *                           example: "$2a$10$iI1H852CpWi75s0dyL8aHeXD0T2TW3lfalor9.0JGszPx9HY6PXSG"
 *                         correo:
 *                           type: string
 *                           example: "doctor@gmail.com"
 *                         direccion:
 *                           type: string
 *                           example: "DOCTOR"
 *                         dni:
 *                           type: string
 *                           example: "00000001"
 *                         fechanac:
 *                           type: string
 *                           example: "2004-04-13T00:00:00"
 *                         nombre:
 *                           type: string
 *                           example: "DOCTOR DOCTOR"
 *                         sexo:
 *                           type: string
 *                           example: "M"
 *                         tipoUsuario:
 *                           type: number
 *                           example: 1 
 *                 success:
 *                   type: boolean
 *                   example: true
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   example: "error"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
  router.get("/listar/todo/:tipo/:hora", (req, res) => {
    var {tipo, hora} = req.params;
    tipo = tipo.toUpperCase();
    hora = hora.toUpperCase();

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