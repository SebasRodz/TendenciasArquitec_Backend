const mongoose = require("mongoose");

const citaSchema = mongoose.Schema({
    paciente: {
        type: mongoose.ObjectId,
        ref: 'User',
        require: true
    },
    doctor: {
        type: mongoose.ObjectId,
        ref: 'Doctor',
        require: true 
    }
});

module.exports = mongoose.model('Cita', citaSchema);