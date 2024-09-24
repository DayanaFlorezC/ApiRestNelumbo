const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    nombre: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: [true, "El email debe ser único"]
    },
    password: {
        type: String,
        required: true,
        minlength: [6, 'La contraseña debe tener al menos 6 caracteres']
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    parkings: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parking', 
        unique: true 
    }],
    role: {
        type: String,
        default: 'socio'
    }

})

userSchema.methods.isParkingExists = function(parkingId) {
    return this.parkings.some(parking => parking.equals(parkingId));
  };
  
const User = mongoose.model('User', userSchema);

module.exports = User;