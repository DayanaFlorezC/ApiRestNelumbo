const express = require('express');
const router = express.Router();
const {
    createUserController,
    getUserByIdController,
    getUsersController,
    updateUserController,
    deleteUserController,
    loginUserController,
    linkUserParkingController,
    enviarEmailController
} = require('../controllers/userController')

//?midlewares
const authFunction = require('../midlewares/auth')
const authAdminFunction = require('../midlewares/authAdmin')

const {
    validateLogin, 
    validateCreateUser, 
    validateCreateEmail
}= require('../midlewares/dataValidator')

// get usuarios 
router.get('/users', authFunction, authAdminFunction, getUsersController)

//get user
router.get('/user/:userId', authFunction, getUserByIdController)

//create user role socio
router.post('/user', authFunction, authAdminFunction, validateCreateUser, createUserController)

//login user
router.post('/user/login', validateLogin, loginUserController)

//update user
router.put('/user/:userId', authFunction, updateUserController)

//delete user
router.delete('/user/:userId', authFunction, deleteUserController)

//link socio a parqueadero
router.patch('/user/:userId/parking', authFunction, authAdminFunction, linkUserParkingController)

//send email
router.post('/email', authFunction, authAdminFunction, validateCreateEmail, enviarEmailController)


module.exports = router