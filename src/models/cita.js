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
    },
    especialidad: {
        type: String,
        require: true 
    },
    turno: {
        type: "String",
        require: true 
    },
    status: {
        type: String,
        require: true 
    }
});

module.exports = mongoose.model('Cita', citaSchema);