const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
/**
 * @openapi
 * /api/pac/{dni}:
 *   get:
 *     tags:
 *       - Auth
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: string
 *         required: true
 *         description: DNI del paciente
 *     responses:
 *       200:
 *         description: OK
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
 *               
 *       404:
 *         description: Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Error: Not Found"
 *
 *                 
 */
router.get('/pac/:dni', async (req, res) => {
    const {dni} = req.params
    fetch(`https://citasenlinea.sisol.gob.pe/Account/FnGetPaciente?idTipoDocumento=1&nroDocumento=${dni}`)
        .then(res => res.json())
        .then(response => res.json(response))
});

module.exports = router;