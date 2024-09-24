const {
    createRegistroVehService,
    getRegistroByIdVehService,
    getRegistrosVehService,
    updateRegistroVehService,
    deleteRegistroVehService,
    updateRegistroVehSalidaService
} = require('../services/registroVehService')

const createRegistroVehController = async (req, res) =>{
    try {
        const registerData = req.body;
        registerData.idSocio = req.user.id;
        const newRegister = await createRegistroVehService(registerData)
        if(!newRegister) return res.status(400).json({success: false, mensaje: 'No se puede Registrar Ingreso, ya existe la placa en este u otro parqueadero o el parqueadero esta lleno'})
        res.status(201).json({success: true, mensaje: 'Registro de vehiculo creado con éxito', id: newRegister._id})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, mensaje: 'algo falló'})
        
    }
}

const getRegistrosVehController = async (req, res) =>{
    try {
        const query = req.query || {}
        const registros = await getRegistrosVehService(query)
        if(!registros) return res.status(400).json({success: false, mensaje: 'No hay registros'})
        res.json({success: true, mensaje: 'Registros', registros})
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, mensaje: 'Algo falló'})
    }
}

const getRegistroByIdVehController = async (req, res) =>{
    try {
        const {registerId} = req.params
        const registro = await getRegistroByIdVehService(registerId)
        if(!registro) return res.status(400).json({success: false, mensaje: 'Registro no encontrado'})
        res.json({success: true, mensaje: 'Registro obtenido', registro})
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, mensaje: 'Algo falló'})
    }
}

const updateRegistroVehController = async (req, res) =>{
    try {
        const {registerId} = req.params
        const updateData = req.body
        const registro = await updateRegistroVehService(registerId, updateData)
        if(!registro) return res.status(400).json({success: false, mensaje: 'Registro no encontrado'})
        res.json({success: true, mensaje: 'Registro actualizado', registro})
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, mensaje: 'Algo falló'})
    }
}

const createRegisterSalida = async (req, res) =>{
    try {
        const {placa, idParqueadero} = req.body
        const registro = await updateRegistroVehSalidaService(placa, idParqueadero)
        if(!registro) return res.status(400).json({success: false, mensaje: 'No se puede Registrar Salida, no existe la placa en el parqueadero'})
        res.json({success: true, mensaje: 'Salida Registrada', registro})
        
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, mensaje: 'algo falló'})
    }
}

const deleteRegistroVehController = async (req, res) =>{
    try {
        const {registerId} = req.params
        const registro = await deleteRegistroVehService(registerId)
        if(!registro) return res.status(400).json({success: false, mensaje: 'Registro no encontrado'})
        res.json({success: true, mensaje: 'Registro eliminado', registro})
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, mensaje: 'Algo falló'})
    }
}


module.exports={
    createRegistroVehController,
    getRegistroByIdVehController,
    getRegistrosVehController,
    updateRegistroVehController,
    deleteRegistroVehController,
    createRegisterSalida
}