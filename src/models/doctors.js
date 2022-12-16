const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    doctor: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true 
    },
    especialidad: {
        type: String,
        required: true
    },
    turno: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Doctor', doctorSchema);