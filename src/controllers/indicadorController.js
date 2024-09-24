const jwt = require('jsonwebtoken');
require('dotenv').config()

const {
    getTopVeh,
    getGananciasService,
    getTopSociosSemanaService,
    getTopParqueaderosSemanaService
} = require('../services/indicadorService')

const getTopVehController = async (req, res) => {

    try {
        const query = req.query
        if(!query.type) return res.json({ success: false, mensaje: 'Falta el tipo de consulta' })
        const topVeh = await getTopVeh(query)
        res.json({ success: true, mensaje: 'ok', topVeh })
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false, mensaje: 'Algo falló' })

    }
}

const getGananciasController = async (req, res) => {
    try {
        const query = req.query

        console.log(query)
        if(!query.type || !query.idParqueadero) return res.json({ success: false, mensaje: 'Falta el tipo de consulta' })

        const ganancias = await getGananciasService(query)
        res.json({ success: true, mensaje: 'ok', ganancias })
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, mensaje: 'Algo falló' })
    }
}

const getTopSociosSemanaController = async (req, res) => {
    try {
        const query = req.query
        const topSociosSemana = await getTopSociosSemanaService(query)
        res.json({ success: true, mensaje: 'ok', topSociosSemana })
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, mensaje: 'Algo falló' })
    }
}

const getTopParqueaderosSemanaController = async (req, res) => {
    try {
        const query = req.query
        const topParqueaderosSemana = await getTopParqueaderosSemanaService(query)
        res.json({ success: true, mensaje: 'ok', topParqueaderosSemana })
    } catch (error) {
        console.log(error)
        res.status(400).json({ success: false, mensaje: 'Algo falló' })
    }
}

module.exports = { 
    getTopVehController,
    getGananciasController,
    getTopSociosSemanaController,
    getTopParqueaderosSemanaController
 }