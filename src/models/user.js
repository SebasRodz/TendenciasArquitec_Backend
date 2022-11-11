const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const hash = 10;

const userSchema = mongoose.Schema({
    apellidoM: {
        type: String,
        required: true
    },
    apellidoP: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    },
    dni: {
        type: Number,
        required: true,
        unique: true
    },
    fechanac: {
        type: String,
        required: true
    },
    nombre: {
        type: String,
        required: true
    },
    sexo: {
        type: String,
        required: true
    },
    tipoUsuario: {
        type: Number,
        required: true
    }
});

userSchema.pre("save", function (next) {
    if (this.isNew || this.isModified("password")) {
        const document = this;
        bcrypt.hash(document.password, hash, (err, hashedPassword) => {
            if(err){
                next(err);
            } else {
                document.password = hashedPassword;
                next();
            }
        });
    } else {
        next();
    }    
});

userSchema.methods.isCorrectPassword = function(password, callback) {

    bcrypt.compare(password, this.password, function(err, same) {
        if (err) {
            callback(err);
        } else {
            callback(err, same);
        }
    });
}

module.exports = mongoose.model('User', userSchema);