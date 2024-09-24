const {
    createRegistroVeh,
    getRegistrosVeh,
    getRegistroByIdVeh,
    updateRegistroVeh,
    deleteRegistroVeh,
    getRegisterWitoutSalida,
    getAmountVeh,
    getRegisterByPlacaAndParking
} = require('../repositories/registroVehiculoRepository')

const {
    getParkingById
} = require('../repositories/parkingRepository')



const createRegistroVehService = async (registerData) => {

    try {
        //?si la placa tiene un registro sin fecha de salida no permitir 
        const resp = await getRegisterWitoutSalida(registerData.placa)
        if (resp) return false, console.log('no se puede registrar, porque ya hay un registro sin fecha de salida')


        //?si el parqueadero ya no tiene cupos no permitir
        const parking = await getParkingById(registerData.idParqueadero)
        const amount = await getAmountVeh(registerData.idParqueadero)

        const total = parking.capacidad - amount

        if (total <= 0) return false, console.log('no se puede registrar, porque el parqueadero esta lleno')

            
        return await createRegistroVeh(registerData)
    } catch (error) {
        throw new Error(`Error creating register: ${error.message}`);
    }

}

const getRegistrosVehService = async (query) => {
    try {
        return getRegistrosVeh(query)
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}

const getRegistroByIdVehService = async (id) => {
    try {

        return getRegistroByIdVeh(id)
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}

const updateRegistroVehService = async (id, updateData) => {
    try {
        return await updateRegistroVeh(id, updateData)
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}

const deleteRegistroVehService = async (id) => {
    try {
        return await deleteRegistroVeh(id)
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}

const updateRegistroVehSalidaService = async (placa, idParking) => {
    try {

        const register = await getRegisterByPlacaAndParking(placa, idParking)
        if (!register) return false, console.log('Registro no encontrado')

        const idParqueadero = register.idParqueadero
        const idRegistro = register._id

        let hours = Math.abs(new Date() - register.fechaIngreso) / 36e5

        const mod = hours % 60 

        if(mod){
          hours=  Math.ceil(hours)
        }

        const parking = await getParkingById(idParqueadero)

        const valorTotal = hours * parking.costoByhour

        const updateData = {
            fechaSalida: new Date(),
            costo: valorTotal
        }
        return await updateRegistroVeh(idRegistro, updateData)
    } catch (error) {
        throw new Error(`Error: ${error.message}`);
    }
}

module.exports = {
    createRegistroVehService,
    getRegistroByIdVehService,
    getRegistrosVehService,
    updateRegistroVehService,
    deleteRegistroVehService,
    updateRegistroVehSalidaService
}
