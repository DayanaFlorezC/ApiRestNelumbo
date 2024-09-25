const bcrypt = require('bcrypt');
const validFieldsAllowsUpdate = require('../utils/validFieldsUpdate')

const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    linkUserParking,
    unlinkUserParking
} = require('../repositories/userRepository')

const {
    getParkingById
} = require('../repositories/parkingRepository')

const {
    getRegisterWitoutSalida
} = require('../repositories/registroVehiculoRepository');

const {
    createEmail
} = require("../repositories/emailRepository")

const createUserService = async ({ password, email }) => {
    try {

        const hashedPassword = await bcrypt.hash(password, 10);

        return await createUser({ email, password: hashedPassword })

    } catch (error) {
        return {
            error: true,
            msg: error.message
        }
    }
}

const loginUserService = async (data) => {
    try {

        const user = await loginUser(data)

        if (!user) {
            return {
                error: true,
                msg: 'No se encontró el usuario'
            }
        }

        const isMatch = await bcrypt.compare(data.password, user.password);

        if (isMatch) {
            return user;
        } else {
            return {
                error: true,
                msg: 'La contraseña no coincide'

            }
        }
    } catch (error) {
        return {
            error: true,
            msg: error.message
        }
    }
}
const getUsersService = async (query) => {
    try {
        return await getUsers(query)

    } catch (error) {
        return {
            error: true,
            msg: error.message
        }
    }
}

const getUserByIdService = async (id) => {
    try {
        return await getUserById(id)

    } catch (error) {
        return {
            error: true,
            msg: error.message
        }
    }
}

const updateUserService = async (userId, updateData) => {
    try {
        const fieldsAllows = ['nombre']
        const valid = await validFieldsAllowsUpdate(fieldsAllows, updateData)
        if(!valid) return {
            error: true,
            msg: 'Algo falló al validar los campós a actualizar'
        }
        return await updateUser(userId, valid)

    } catch (error) {
        return {
            error: true,
            msg: error.message
        }
    }
}

const deleteUserService = async (userId) => {
    try {
        return await deleteUser(userId)

    } catch (error) {
        return {
            error: true,
            msg: error.message
        }
    }
}

const linkUserParkingService = async (userId, parkingId) => {
    try {
        const user = await getUserById(userId)
        if (user.role === 'admin') return {
            error: true,
            msg: 'No se puede asignar un parqueadero al administrador'
        }

        if (user.isParkingExists(parkingId)) {
            return {
                error: true,
                msg: 'El usuario ya tiene este parqueadero asignado'
            }
          }

        const link = await linkUserParking(userId, parkingId, user)

        if(!link) return {
            error: true,
            msg: 'No se pudo realizar la asignacion de parqueadero al usuario'
        }
    
        return link
    } catch (error) {
        return {
            error: true,
            msg: error.message
        }
    }
}

const unlinkUserParkingService = async (parkingId, userId) =>{
    try {

        const user = await getUserById(userId)

        if (!user.isParkingExists(parkingId)) {
            return {
                error: true,
                msg: 'El usuario no tiene asignado este parqueadero'
            }
          }


        return unlinkUserParking(parkingId, userId)
        
    } catch (error) {
        return {
            error: true,
            msg: error.message
        }
    }
}


const enviarEmailService = async (data) => {
    try {

        const parking = await getParkingById(data.parqueaderoId)

        if (!parking) return {
            error: true,
            msg: 'El parqueadero no existe'
        }
        const register = await getRegisterWitoutSalida(data.placa)

        if (!register) return {
            error: true,
            msg: 'El registro no existe'
        }

        //?validacion que la placa este en el parqueadero
        if (register.idParqueadero+'' !== parking._id+'') return {
            error: true,
            msg: 'La placa no esta en el parqueadero'
        }

        data.parqueaderoNombre = parking.nombre

        const uri = `http://localhost:3000/api/email`
        const response = await fetch(uri, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })

        if(response.status === 200) {
            await createEmail({
                to: data.email,
                from: 'mayoflorezc@gmail.com',
                subject: 'Prueba estacionamiento',
                placa: data.placa, 
                idParking: data.parqueaderoId,
                message: data.mensaje
            }) 
            return true 
        }else{
            return false
        }

    } catch (error) {
        return {
            error: true,
            msg: error.message
        }
    }
}

module.exports = {
    createUserService,
    getUserByIdService,
    getUsersService,
    deleteUserService,
    updateUserService,
    loginUserService,
    linkUserParkingService,
    unlinkUserParkingService,
    enviarEmailService
}