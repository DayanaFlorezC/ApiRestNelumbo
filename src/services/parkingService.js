const {
    createParking,
    getParkings,
    getParkingById,
    updateParking,
    deleteParking
} = require('../repositories/parkingRepository')

const {
    getUserByIdWithoutPop
} = require('../repositories/userRepository')

const {
    getRegisterByParkingId,
    getAmountVeh
} = require('../repositories/registroVehiculoRepository')


const createParkingService = async (data) => {
    try {
        return await createParking(data)

    } catch (error) {
        throw new Error(`Error in parking service: ${error.message}`);
    }
}

const getParkingsService = async () => {
    try {
        return await getParkings()

    } catch (error) {
        throw new Error(`Error in parking service: ${error.message}`);
    }
}

const getParkingByIdService = async (id, user) => {
    try {
        const idUser = user.id

        if (user.role === 'admin') {
            return await getParkingById(id)
        } else {
            const userParking = await getUserByIdWithoutPop(idUser)
            const parking = await getParkingById(id)

            if (!userParking.parkings.includes(id)) {
                throw new Error(`El usuario no tiene permisos para ver este parqueadero`)
            }

            return parking
        }

    } catch (error) {
        throw new Error(`Error in parking service: ${error.message}`);
    }
}


const updateParkingService = async (id, updateData) => {
    try {

        const current_veh = await getAmountVeh(id)

        if(updateData?.capacidad && current_veh > updateData?.capacidad){
            return  {
                error: true,
                msg: "No se puede actualizar la capacidad del parqueadero a una menor a la cantidad actual de vehiculos"
            }
        }

        return await updateParking(id, updateData)

    } catch (error) {
        throw new Error(`Error in parking service: ${error.message}`);
    }
}

const deleteParkingService = async (id) => {
    try {
        return await deleteParking(id)

    } catch (error) {
        throw new Error(`Error in parking service: ${error.message}`);
    }
}

const getParkingRegisterService = async ( id) => {
    try {

        const registers = await getRegisterByParkingId(id)
        const parking = await getParkingById(id)

        if (!parking) {
            throw new Error(`El parqueadero no existe`)
        }

        if(!registers){
            throw new Error(`No hay registros para este parqueadero`)
        }


        return {parking, registers}

    } catch (error) {
        throw new Error(`Error in parking service: ${error.message}`);
    }
}

module.exports = {
    createParkingService,
    getParkingsService,
    getParkingByIdService,
    updateParkingService,
    deleteParkingService,
    getParkingRegisterService
}