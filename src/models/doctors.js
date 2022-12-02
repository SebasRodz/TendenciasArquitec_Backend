const mongoose = require("mongoose");

const doctorSchema = mongoose.Schema({
    doctor: {
        type: mongoose.ObjectId,
        ref: 'User',
        require: true 
    },
    especialidad: {
        type: String,
        require: true
    },
    turno: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Doctor', doctorSchema);