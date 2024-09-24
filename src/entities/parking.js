const mongoose = require('mongoose')

const parkingSchema = new mongoose.Schema({

    nombre: {
        type: String,
        require: true,
        unique: true
    },
    costoByhour: {
        type: Number,
        required: true,
        min: [0, "El costo debe ser mayor a 0"]
    },
    capacidad: {
        type: Number,
        required: true,
        min: [0, "El costo debe ser mayor a 0"]
        
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})


const Parking = mongoose.model('Parking', parkingSchema);

module.exports = Parking;