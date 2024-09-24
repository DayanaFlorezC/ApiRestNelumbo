const {
    getTopVehAllParkings,
    getTopVehOneParking,
    getVehFirstTime,
    getGanancias,
    getGananciasHoy,
    getGananciasSemana,
    getGananciasMes,
    getGananciasAnio,
    getTopSociosSemana,
    getTopParqueaderosSemana
} = require('../repositories/registroVehiculoRepository')


const getTopVeh = async (query) => {
    try {

        if(query.type === 'all') return await getTopVehAllParkings()
        
        if(query.type === 'one') return await getTopVehOneParking(query.idParqueadero)

        if(query.type === 'first') return await getVehFirstTime(query.idParqueadero)

        return false

    } catch (error) {
        throw new Error(`Error in parking service: ${error.message}`);
    }
}


const getGananciasService = async (query) => {
    try {

        if(query.type === 'all') return await getGanancias(query.idParqueadero)

        if(query.type === 'hoy') return await getGananciasHoy(query.idParqueadero)

        if(query.type === 'semana') return await getGananciasSemana(query.idParqueadero)

        if(query.type === 'mes') return await getGananciasMes(query.idParqueadero)

        if(query.type === 'anio') return await getGananciasAnio(query.idParqueadero)

        return false

    } catch (error) {
        throw new Error(`Error in parking service: ${error.message}`);
    }
}

const getTopSociosSemanaService = async () => {
    try {
        return await getTopSociosSemana()
    } catch (error) {
        throw new Error(`Error in parking service: ${error.message}`);
    }
}

const getTopParqueaderosSemanaService = async () => {
    try {
        return await getTopParqueaderosSemana()
    } catch (error) {
        throw new Error(`Error in parking service: ${error.message}`);
    }
}


module.exports = {
    getTopVeh,
    getGananciasService,
    getTopSociosSemanaService,
    getTopParqueaderosSemanaService
}