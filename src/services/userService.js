const bcrypt = require('bcrypt');

const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    linkUserParking
} = require('../repositories/userRepository')

const {
    getParkingById
} = require('../repositories/parkingRepository')

const {
    getRegisterWitoutSalida
} = require('../repositories/registroVehiculoRepository');
const { findById } = require('../entities/registroVehiculo');

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
        return await updateUser(userId, updateData)

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
            console.log('El parking ya existe en el usuario.');
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
        if (register.idParqueadero !== parking._id) return {
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

        return true
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
    enviarEmailService
}