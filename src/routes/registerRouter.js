const express = require('express');
const router = express.Router(); 

const {
    createRegistroVehController,
    getRegistroByIdVehController,
    getRegistrosVehController,
    updateRegistroVehController,
    deleteRegistroVehController,
    createRegisterSalida
} = require('../controllers/registroVehController')

//?midlewares
const authFunction = require('../midlewares/auth')
const authAdminFunction = require('../midlewares/authAdmin')

const {
    validateCreateRegistersInOut
}= require('../midlewares/dataValidator')


// get  
router.get('/registers', authFunction, getRegistrosVehController)

//getone
router.get('/register/:registerId', authFunction, getRegistroByIdVehController)

//create  
router.post('/register', authFunction, validateCreateRegistersInOut, createRegistroVehController)

//update
router.put('/register/:registerId', authFunction, updateRegistroVehController)

//update
router.post('/register/salida', authFunction, validateCreateRegistersInOut, createRegisterSalida)

//delete
router.delete('/register/:registerId', authFunction, deleteRegistroVehController)


module.exports = router