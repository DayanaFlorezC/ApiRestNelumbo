const express = require('express');
const router = express.Router();

const {
    createParkingController,
    getParkingByIdController,
    getParkingsController,
    updateParkingController,
    deleteParkingController,
    getParkingRegisterController
} = require('../controllers/parkingController')

//?midlewares
const authFunction = require('../midlewares/auth')
const authAdminFunction = require('../midlewares/authAdmin')

const {
    validateCreateParking,
    validatePutParking
}= require('../midlewares/dataValidator')


// get  
router.get('/parkings', authFunction, authAdminFunction, getParkingsController)

//getone
router.get('/parking/:parkingId', authFunction, getParkingByIdController)

//get parking with register list
router.get('/parking/registers/:parkingId', authFunction, getParkingRegisterController)

//create  
router.post('/parking', authFunction, authAdminFunction, validateCreateParking, createParkingController)

//update
router.put('/parking/:parkingId', authFunction, authAdminFunction, validatePutParking, updateParkingController)

//delete
router.delete('/parking/:parkingId', authFunction, authAdminFunction, deleteParkingController)


module.exports = router