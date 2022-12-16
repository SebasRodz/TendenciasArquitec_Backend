const express = require("express");
const userSchema = require("../models/user");
const doctorSchema = require("../models/doctors");
const { send } = require("express/lib/response");
const { utils } = require("mocha");
const app = require("../app");
const router = express.Router();

//Probar cosas
router.post("/probar", (req, res) => {
  id = req.body.id;
  res.send(id);
})

/**
 * @openapi
 * /api/users/register:
 *   post:
 *     tags:
 *       - Pacientes
 *     summary: Registro de pacientes.
 *     description: Se registra un paciente con un formato de JSON definido y requerido.
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
 *                 tipoUsuario:
 *                   type: number
 *                   example: 0
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
 *                       example: "mail@mail.com"
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
 *                       example: 0
 *                     _id:
 *                       type: string
 *                       example: "639142da2d5c0d30360d9b93"
 *                 info:
 *                   type: string
 *                   example: "Usuario registrado."
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
 *                   type: array
 *                   example: []
 *                 info:
 *                   type: string
 *                   example: "Error al registrar usuario"
 *                 success:
 *                   type: boolean
 *                   example: false
 */
router.post("/register", (req, res) => {
  const user = userSchema(req.body);
  user.tipoUsuario = 0;

  user.save((err) => {
    if (err) {
      res.status(400).send({
        data: err,
        info: "Error al registrar usuario",
        success: false,
      });
    } else {
      res.status(200).send({
        data: user,
        info: "Usuario registrado",
        success: true,
      });
    }
  });
});


/**
 * @openapi
 * /api/users/auth:
 *   post:
 *     tags:
 *       - Pacientes
 *     summary: Autentificacion de usuarios.
 *     description: Se autentifican los usuarios con un formato JSON definido y requerido.
 *     requestBody:
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 dni:
 *                   type: string
 *                   example: "12345678"
 *                 password:
 *                   type: string
 *                   example: "xxxxxxx"
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
 *                       example: "639145a41fef7b7a7359d9aa"
 *                     apellidoM:
 *                       type: string
 *                       example: "Perez"
 *                     apellidoP:
 *                       type: string
 *                       example: "Perez"
 *                     password:
 *                       type: string
 *                       example: "$2a$10$nPDkTOOmm7vSrADeqkYe3ulI0Sj38HxOB/NiJisYgmZz6TEOHqJO."
 *                     correo:
 *                       type: string
 *                       example: "mail@mail.com"
 *                     direccion:
 *                       type: string
 *                       example: "Av.siempre viva"
 *                     dni:
 *                       type: string
 *                       example: "12345677"
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
 *                       example: 0
 *                 info:
 *                   type: string
 *                   example: "Usuario identificado"
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
 *                 info:
 *                   type: string
 *                   example: "Usuario no encontrado / Contraseña incorrecta"
 *                 data:
 *                   type: string
 *                   example: []
 *                   nullable: true
 *                 success:
 *                   type: boolean
 *                   example: false  
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error"
 *                 success:
 *                   type: boolean
 *                   example: false        
 */
router.post("/auth", (req, res) => {
  const { dni, password } = req.body;

  userSchema.findOne(
    {
      dni,
    },
    (err, user) => {
      if (err) {
        res.status(500).send({
          data: err,
          info: "Error",
          success: false
        });
      } else if (!user) {
        res.status(400).send({
          info: "Usuario no encontrado",
          data: user,
          success: false
        });
      } else {
        user.isCorrectPassword(password, (err, result) => {
          if (err) {
            res.status(500).send({
              data: err,
              info: "Error con la contraseña",
              success: false
            });
          } else if (result) {
            res.status(200).send({
              data: user,
              info: "Usuario identificado",
              success: true
            });
          } else {
            res.status(400).send({
              info: "Contraseña incorrecta",
              data: null,
              success: false
            });
          }
        });
      }
    }
  );
});

/**
 * @openapi
 * /api/users/listar:
 *   get:
 *     tags:
 *       - Pacientes
 *     summary: Lista el total de pacientes.
 *     description: Devuelve un JSON con todos los pacientes registrados.
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
 *                       example: "639145a41fef7b7a7359d9aa"
 *                     apellidoM:
 *                       type: string
 *                       example: "Perez"
 *                     apellidoP:
 *                       type: string
 *                       example: "Perez"
 *                     password:
 *                       type: string
 *                       example: "$2a$10$nPDkTOOmm7vSrADeqkYe3ulI0Sj38HxOB/NiJisYgmZz6TEOHqJO."
 *                     correo:
 *                       type: string
 *                       example: "mail@mail.com"
 *                     direccion:
 *                       type: string
 *                       example: "Av.siempre viva"
 *                     dni:
 *                       type: string
 *                       example: "12345677"
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
 *                       example: 0
 *                 success:
 *                   type: string
 *                   example: "success"   
 *       400:
 *         description: Error
 *         content: 
 *           application/json:
 *             schema:
 *               type: object
 *               properties: 
 *                 data:
 *                   type: array
 *                   example: []
 *                 info:
 *                   type: string
 *                   example: "No existen pacientes en este momento."
 *                 success:
 *                   type: boolean
 *                   example: false
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error"
 *                 success:
 *                   type: boolean
 *                   example: false            
 */
router.get("/listar", (req, res) => {
  userSchema
    .find({ tipoUsuario: 0 })
    .exec(function (err, user) {
      if (err) {
        res.status(500).send({
          error: err,
          sucess: false
        })
      }
      else if (user.length === 0) {
        res.status(400).send({
          data: user,
          info: "No existen pacientes en este momento",
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