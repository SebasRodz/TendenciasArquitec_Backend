const express = require("express");
const userSchema = require("../models/user");
const router = express.Router();

//Probar cosas
router.get("/probar", (req, res) => {
  res.send("Probando ando");
});
/**
 * @openapi
 * /api/register:
 *   post:
 *     tags:
 *       - Register
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
 *                   type: string
 *                   example: "2"
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Usuario registrado correctamente"
 *               
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error"
 *
 *                 
 */
router.post("/register", (req, res) => {
  const user = userSchema(req.body);

  user.save((err) => {
    if (err) {
      res.status(500).send({
        data: err,
        success: false,
      });
    } else {
      res.status(200).send({
        data: user,
        success: true,
      });
    }
  });
});


/**
 * @openapi
 * /api/auth:
 *   post:
 *     tags:
 *       - Auth
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
 *                 message:
 *                   type: string
 *                   example: "Usuario registrado correctamente"
 *               
 *       500:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error"
 *
 *                 
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
          success: false,
        });
      } else if (!user) {
        res.status(500).send({
          data: err,
          success: false,
        });
      } else {
        user.isCorrectPassword(password, (err, result) => {
          if (err) {
            res.status(500).send({
              data: err,
              success: false,
            });
          } else if (result) {
            res.status(200).send({
              data: user,
              success: true,
            });
          } else {
            res.status(500).send({
              data: err,
              success: false,
            });
          }
        });
      }
    }
  );
});

module.exports = router;