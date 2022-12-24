const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
/**
 * @openapi
 * /api/pac/{dni}:
 *   get:
 *     tags:
 *       - Extra
 *     summary: Obtencion de datos por dni.
 *     description: Retorna un JSON con la información del usuario respecto a su DNI como parametro.
 *     parameters:
 *       - in: path
 *         name: dni
 *         schema:
 *           type: string
 *         required: true
 *         description: DNI de la persona.
 *     responses:
 *       200:
 *         description: Operacion satisfactoria con resultados.
 *         content:
 *           aplication/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object  
 *                   properties: 
 *                     numero:
 *                       type: string
 *                       example: "71814623"
 *                     nombre_completo:
 *                       type: string
 *                       example: "CASTILLO FLORES, SELINE MARYORITH"  
 *                     nombres:
 *                       type: string
 *                       example: "SELINE MARYORITH"
 *                     apellido_paterno:
 *                       type: string
 *                       example: "CASTILLO"
 *                     apellido_materno:
 *                       type: string
 *                       example: "FLORES"
 *                     codigo_verificacion:
 *                       type: number
 *                       example: 8
 *                     fecha_nacimiento:
 *                       type: string
 *                       example: "2004-04-13"
 *                     sexo:
 *                       type: string
 *                       example: "FEMENINO"
 *                     estado_civil:
 *                       type: string
 *                       example: "SOLTERO"
 *                     departamento:
 *                       type: string
 *                       example: "LIMA"
 *                     provincia:
 *                       type: string
 *                       example: "LIMA"
 *                     distrito:
 *                       type: string
 *                       example: "COMAS"
 *                     direccion:
 *                       type: string
 *                       example: "JR. HUSARES DE JUNIN ASENT.H. EL MIRADOR MZ. V5 LT. 5"
 *                     direccion_completa:
 *                       type: string
 *                       example: "JR. HUSARES DE JUNIN ASENT.H. EL MIRADOR MZ. V5 LT. 5, LIMA - LIMA - COMAS"
 *                     ubigeo_reniec:
 *                       type: string
 *                       example: "140106"
 *                     ubigeo_sunat:
 *                       type: string
 *                       example: "150110"
 *                     ubigeo:
 *                       type: array
 *                       items:
 *                         type: string
 *                 sources:
 *                   type: string
 *                   example: "apiperu.dev"
 *       400:
 *         description: DNI invalido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "DNI inválido"     
 *                 source:
 *                   type: string
 *                   example: "apiperu.dev"
 */
router.get('/pac1/:dni', async (req, res) => {
    const {dni} = req.params
    //fetch(`https://citasenlinea.sisol.gob.pe/Account/FnGetPaciente?idTipoDocumento=1&nroDocumento=${dni}`)
    fetch(`http://line.consultadatosreniec.online/consultdni/${dni}`)
        .then(res => res.json())
        .then(response => res.json(response))
        .catch(err => console.error('error:' + err));
});

module.exports = router;