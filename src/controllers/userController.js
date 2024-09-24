const jwt = require('jsonwebtoken');
require('dotenv').config()

const { 
    createUserService,
    getUserByIdService,
    getUsersService,
    deleteUserService,
    updateUserService,
    loginUserService,
    linkUserParkingService,
    enviarEmailService
 } = require('../services/userService')

const createUserController = async (req, res) => {

    try {
        const data = req.body
        const newUser = await createUserService(data)
        const user = {
            email: newUser.email,
            parkings: newUser.parkings,
            _id: newUser._id,
            role: newUser.role, 
            createdAt: newUser.createdAt
        }
        if(newUser.error) return res.status(400).json({success: false, mensaje: 'Error al crear el usuario'})
        res.status(201).json({success: true, mensaje: 'Usuario creado con éxito', user})
    } catch (err) {
        console.log(err)
        res.status(400).json({success: false,  mensaje: 'Algo falló'})

    }
}


const loginUserController = async (req, res) =>{
    try {
        const data = req.body
        const user = await loginUserService(data)

        const userLog = {
            email: user.email,
            parkings: user.parkings,
            _id: user._id,
            role: user.role, 
            createdAt: user.createdAt
        }

        if (user.error) {
            res.status(401).json({ success :false, mensaje: user.msg });
        } else {
            const token = jwt.sign({email: user.email, role: user.role, id: user._id }, process.env.JWT_SECRET, {
                expiresIn: '6h'
            });
            user.token = token        
            res.status(200).json({ success: true,  user: userLog, token, mensaje: 'usuario logueado' });
        }
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false, mensaje: 'Ocurrió un error al intentar loguear el usuario'})
    }
}


const getUsersController = async (req, res) => {
    try {
        const query = req.query || {}

        const users = await getUsersService(query)

        if(!users) return res.status(400).json({success: false, mensaje: 'Error al obtener los usuarios'})

        if(users.error) return res.status(400).json({success: false, mensaje: 'Algo falló'})

        res.json({success: true, mensaje: 'ok', users})
    } catch (error) {
        console.log(err)
        res.status(400).json({success: false,  mensaje: 'Algo falló'})
    }
}


const getUserByIdController = async (req, res) => {
    try {
        const {userId} = req.params
        if(req.user.role !== 'admin' && req.user.id !== userId ) return res.json({success: false, mensaje: 'No tienes permisos para ver este usuario'})
        const user = await getUserByIdService(userId)
        if(!user) return res.json({success: false, mensaje: 'Usuario no encontrado'})
        if(user.error) return res.status(400).json({success: false, mensaje: 'Algo falló'})
        res.json({success: true, mensaje: 'ok', user})
    } catch (error) {
        console.log(err)
        res.status(400).json({success: false,  mensaje: 'Algo falló'})
    }
}

const updateUserController = async (req, res) => {
    try {
        const updateData = req.body
        const {userId} = req.params
        const user = await updateUserService(userId, updateData)
        if(!user) return res.json({success: false, mensaje: 'Usuario no encontrado'})
        if(user.error) return res.status(400).json({success: false, mensaje: 'Algo falló'})
        res.json({success: true, mensaje: 'ok', user})
    } catch (error) {
        console.log(err)
        res.status(400).json({success: false,  mensaje: 'Algo falló'})
    }
}

const deleteUserController = async (req, res) => {
    try {
        const {userId} = req.params
        const user = await deleteUserService(userId)
        if(!user) return res.json({success: false, mensaje: 'Usuario no encontrado'})
        res.json({success: true, mensaje: 'Usuario eliminado correctamente'})
    } catch (error) {
        console.log(err)
        res.status(400).json({success: false,  mensaje: 'Algo falló'})
    }
}

const linkUserParkingController = async (req, res) =>{
    try {
        const {parkingId} = req.body
        const {userId} = req.params

        const user = await linkUserParkingService(userId, parkingId)

        if(user.error) return res.status(400).json({success: false, mensaje: user.msg})

        res.json({success: true, mensaje: 'Socio asignado correctamente al parqueadero'})
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false,  mensaje: 'Algo falló'})
    }
}

const enviarEmailController = async (req, res) => {
    try {
        const data = req.body
        const user = await enviarEmailService(data)
        if(user.error) return res.status(400).json({success: false, mensaje: user.msg})
        res.json({success: true, mensaje: 'Email enviado correctamente', user})
    } catch (error) {
        console.log(error)
        res.status(400).json({success: false,  mensaje: 'Algo falló'})
    }
}

module.exports = {
    createUserController,
    getUserByIdController,
    getUsersController,
    updateUserController,
    deleteUserController,
    loginUserController,
    linkUserParkingController,
    enviarEmailController
}