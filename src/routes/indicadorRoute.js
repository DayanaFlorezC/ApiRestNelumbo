const express = require('express');
const router = express.Router();

const {
    getTopVehController,
    getGananciasController,
    getTopSociosSemanaController,
    getTopParqueaderosSemanaController
} = require('../controllers/indicadorController')

//?midlewares
const authFunction = require('../midlewares/auth')
const authAdminFunction = require('../midlewares/authAdmin')


// get  
router.get('/indicador/ganancias', authFunction, getGananciasController)

// get  
router.get('/indicador/vehiculos', authFunction, getTopVehController)

// get  
router.get('/indicador/socios', authFunction, authAdminFunction, getTopSociosSemanaController)

// get  
router.get('/indicador/parqueaderos', authFunction, authAdminFunction, getTopParqueaderosSemanaController)



module.exports = router