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


// get  
router.get('/registers', authFunction, getRegistrosVehController)

//getone
router.get('/register/:registerId', authFunction, getRegistroByIdVehController)

//create  
router.post('/register', authFunction, createRegistroVehController)

//update
router.put('/register/:registerId', authFunction, updateRegistroVehController)

//update
router.post('/registerSalida/', authFunction, createRegisterSalida)

//delete
router.delete('/register/:registerId', authFunction, deleteRegistroVehController)


module.exports = router