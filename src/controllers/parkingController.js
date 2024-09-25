const { 
    createParkingService,
    getParkingsService,
    getParkingByIdService,
    updateParkingService,
    deleteParkingService,
    getParkingRegisterService
 } = require('../services/parkingService')

const createParkingController = async (req, res) => {

    try {
        const data = req.body
        const newParking = await createParkingService(data)
        res.json({success: true, mensaje: 'Parqueadero creado con éxito', parking: newParking})
    } catch (err) {
        console.log(err)
        res.status(400).json({success: false,  mensaje: 'Algo falló'})

    }

}


const getParkingsController = async (req, res) => {
    try {
        const query = req.query
        const parkings = await getParkingsService(query)
        res.json({success: true, mensaje: 'ok', parkings})
    } catch (error) {
        console.log(err)
        res.status(400).json({success: false,  mensaje: 'Algo falló'})
    }
}


const getParkingByIdController = async (req, res) => {
    try {
        const {parkingId} = req.params
        const user = req.user
        const parking = await getParkingByIdService(parkingId, user)
        res.json({success: true, mensaje: 'ok', parking})
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false,  mensaje: 'Algo falló'})
    }
}

const updateParkingController = async (req, res) => {
    try {
        const updateData = req.body
        const {parkingId} = req.params
        const parking = await updateParkingService(parkingId, updateData)
        if(!parking) return res.status(400).json({success: false, mensaje: 'Algo falló'})
        if(parking.error) return res.status(400).json({success: false, mensaje: parking.msg})
        res.json({success: true, mensaje: 'ok', parking})
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false,  mensaje: 'Algo falló'})
    }
}

const deleteParkingController = async (req, res) => {
    try {
        const {parkingId} = req.params
        const parking = await deleteParkingService(parkingId)
        res.json({success: true, mensaje: 'ok', parking})
    } catch (error) {
        console.log(err)
        res.status(400).json({success: false,  mensaje: 'Algo falló'})
    }
}

const getParkingRegisterController = async (req, res) => {
    try {
        const {parkingId} = req.params
        const {parking, registers}  = await getParkingRegisterService(parkingId)
        if(!parking) return res.json({success: false, mensaje: 'Parqueadero no encontrado'})

        if(!registers) return res.json({success: false, mensaje: 'No hay registros'})
        res.json({success: true, mensaje: 'ok', parking, registers})
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false,  mensaje: 'Algo falló'})
    }
}

module.exports = {
    createParkingController,
    getParkingByIdController,
    getParkingsController,
    updateParkingController,
    deleteParkingController,
    getParkingRegisterController
}