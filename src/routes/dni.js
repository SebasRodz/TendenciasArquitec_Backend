const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.get('/pac/:dni', async (req, res) => {
    const {dni} = req.params
    fetch(`https://citasenlinea.sisol.gob.pe/Account/FnGetPaciente?idTipoDocumento=1&nroDocumento=${dni}`)
        .then(res => res.json())
        .then(response => res.json(response))
});

module.exports = router;