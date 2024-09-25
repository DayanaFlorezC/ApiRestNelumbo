const mongoose = require('mongoose')

const emailSchema = new mongoose.Schema({

    to: {
        type: String,
        require: true
    },
    from: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
        minlength: [1, 'El asunto debe tener al menos 1 caracter'],
        maxlength: [50, 'El asunto debe tener menos de 50 caracter']
    },
    message: {
        type: String,
        required: true,
        minlength: [1, 'El cuerpo del email debe tener al menos 1 caracter'],
        maxlength: [200, 'El cuerpo del email debe tener menos de 200 caracteres']
    },
    idParking: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parking'
    },
    placa: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }

})
  
const Email = mongoose.model('Email', emailSchema);

module.exports = Email;