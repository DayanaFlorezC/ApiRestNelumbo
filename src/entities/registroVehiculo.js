const mongoose = require('mongoose')


const registroVehiculoSchema = new mongoose.Schema({
    placa: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return /^[a-zA-Z0-9]{6}$/.test(v);
            },
            message: props => `${props.value} no es una placa válida. Debe tener 6 caracteres alfanuméricos y no puede contener caracteres especiales ni la letra ñ.`
        }
    },
    idParqueadero: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Parking'
    },
    idSocio: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    fechaIngreso:{
        type: Date,
        default: Date.now
    },
    fechaSalida: {
        type: Date,
        default: null
    },
    costo: {
        type: Number,
        default: 0
    }

})


const RegistroVehiculo = mongoose.model('Vehiculo', registroVehiculoSchema);


module.exports = RegistroVehiculo