const RegistroVehiculo = require('../entities/registroVehiculo')
const mongoose = require('mongoose')

const createRegistroVeh = async (registerData) => {
  try {
    const newRegister = await RegistroVehiculo.create(registerData)
    return newRegister

  } catch (error) {
    throw new Error(`Error creating : ${error.message}`);
  }
}

const getRegistrosVeh = async (query) => {
  try {
    const registers = await RegistroVehiculo.find(query)
    return registers
  } catch (error) {
    throw new Error(`Error getAll: ${error.message}`);
  }
}

const getRegistroByIdVeh = async (id) => {
  try {
    const register = await RegistroVehiculo.findById(id)
    return register
  } catch (error) {
    throw new Error(`Error getOne: ${error.message}`);
  }
}

const getRegisterByPlacaAndParking = async (placa, id) => {
  try {
    const idParqueadero = new mongoose.Types.ObjectId(id)
    const register = await RegistroVehiculo.findOne({ placa, idParqueadero, fechaSalida: null })

    return register
  } catch (error) {
    throw new Error(`Error getOne By placa: ${error.message}`);
  }
}

const updateRegistroVeh = async (id, updateData) => {
  try {
    const register = await RegistroVehiculo.findByIdAndUpdate(id, updateData, { new: true })
    return register

  } catch (error) {
    throw new Error(`Error update : ${error.message}`);
  }
}

const deleteRegistroVeh = async (id) => {
  try {
    const register = await RegistroVehiculo.findByIdAndDelete(id)
    return register

  } catch (error) {
    throw new Error(`Error delete register: ${error.message}`);
  }
}

const getRegisterWitoutSalida = async (placa) => {
  try {
    const register = await RegistroVehiculo.findOne({ placa, fechaSalida: null })
    return register

  } catch (error) {
    throw new Error(`Error create salida: ${error.message}`);
  }
}

const getAmountVeh = async (id) => {

  try {
    const idParqueadero = new mongoose.Types.ObjectId(id)

    const veh = await RegistroVehiculo.find({ idParqueadero, fechaSalida: null })

    return veh.length

  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
}


const getRegisterByParkingId = async (id) => {
  try {
    const registers = await RegistroVehiculo.find({ idParqueadero: id, fechaSalida: null })
    return registers
  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
}

//?indicadores 

/*
Top 10 vehículos que más veces se han registrado en los diferentes parqueaderos 
y cuantas veces han sido
*/

const getTopVehAllParkings = async () => {
  try {
    const veh = await RegistroVehiculo.aggregate([
      {
        $group: {
          _id: "$placa",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ])
    return veh
  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
}


//?Top 10 vehículos que más veces se han registrado en un parqueadero y cuantas veces han sido

const getTopVehOneParking = async (id) => {
  try {
    const idParqueadero = new mongoose.Types.ObjectId(id)
    const veh = await RegistroVehiculo.aggregate([
      {
        $match: { idParqueadero }
      },
      {
        $group: {
          _id: "$placa",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      }
    ])
    return veh
  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
}

//?verificar de los vehículos parqueados cuales son por primera vez en ese parqueadero
const getVehFirstTime = async (id) => {
  try {
    const idParqueadero = new mongoose.Types.ObjectId(id)
    const vehiculos = await RegistroVehiculo.aggregate([
      {
        $match: { idParqueadero }
      },
      {
        $group: {
          _id: "$placa",
          fechaSalida: { $first: "$fechaSalida" },
          count: { $sum: 1 },
        }
      },
      {
        $match: { count: 1, fechaSalida: null }
      }
    ])

    return vehiculos

  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
}

//? Todas las ganancias de un parqueadero
const getGanancias = async (id) => {
  try {
    const idParqueadero = new mongoose.Types.ObjectId(id)
    const ganancias = await RegistroVehiculo.aggregate([
      {
        $match: { idParqueadero }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$costo" }
        }
      }
    ])

    return ganancias

  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
}

//? ganancias hoy
const getGananciasHoy = async (id) => {
  try {
    const idParqueadero = new mongoose.Types.ObjectId(id)

    const ganancias = await RegistroVehiculo.aggregate([
      {
        $match: { idParqueadero, fechaIngreso: { $gte: new Date(new Date().setHours(0, 0, 0)), $lt: new Date(new Date().setHours(23, 59, 59)) } }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$costo" }
        }
      }
    ])

    return ganancias

  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
}

//?ganancias semana
const getGananciasSemana = async (id) => {
  try {
    const idParqueadero = new mongoose.Types.ObjectId(id)    
    const ganancias = await RegistroVehiculo.aggregate([
      {
        $match: { idParqueadero, fechaIngreso: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)), $lt: new Date() } }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$costo" }
        }
      }
    ])

    return ganancias

  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
}

//?ganancias mes
const getGananciasMes = async (id) => {
  try {
    const idParqueadero = new mongoose.Types.ObjectId(id)
    const ganancias = await RegistroVehiculo.aggregate([
      {
        $match: { idParqueadero, fechaIngreso: { $gte: new Date(new Date().setDate(new Date().getDate() - 30)), $lt: new Date() } }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$costo" }
        }
      }
    ])

    return ganancias

  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
}

//?ganancias año
const getGananciasAnio = async (id) => {
  try {
    const idParqueadero = new mongoose.Types.ObjectId(id)
    const ganancias = await RegistroVehiculo.aggregate([
      {
        $match: { idParqueadero, fechaIngreso: { $gte: new Date(new Date().setDate(new Date().getDate() - 365)), $lt: new Date() } }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$costo" }
        }
      }
    ])

    return ganancias

  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
}

//?Top 3 de los socios con más ingresos de vehículos en la semana actual y mostrar la cantidad de vehículos

const getTopSociosSemana = async () => {
  try {
    const socios = await RegistroVehiculo.aggregate([
      {
        $match: { fechaIngreso: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)), $lt: new Date() } }
      },
      {
        $group: {
          _id: "$idSocio",
          total: { $sum: "$costo" },
          count: { $sum: 1 }
        }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "socio"
        }
      },
      {
        $unwind: "$socio"
      },
      {
        $sort: { total: -1 }
      },
      {
        $limit: 3
      }
    ])

    return socios

  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
}

//?Top 3 de los parqueaderos con mayor ganancia en la semana
const getTopParqueaderosSemana = async () => {
  try {
    const parqueaderos = await RegistroVehiculo.aggregate([
      {
        $match: { fechaIngreso: { $gte: new Date(new Date().setDate(new Date().getDate() - 7)), $lt: new Date() } }
      },
      {
        $group: {
          _id: "$idParqueadero",
          total: { $sum: "$costo" }
        }
      },
      {
        $lookup: {
          from: "parkings",
          localField: "_id",
          foreignField: "_id",
          as: "parqueadero"
        }
      },
      {
        $unwind: "$parqueadero"
      },
      {
        $sort: { total: -1 }
      },
      {
        $limit: 3
      }
    ])

    return parqueaderos

  } catch (error) {
    throw new Error(`Error : ${error.message}`);
  }
}

module.exports = {
  createRegistroVeh,
  getRegistrosVeh,
  getRegistroByIdVeh,
  updateRegistroVeh,
  deleteRegistroVeh,
  getRegisterWitoutSalida,
  getAmountVeh,
  getRegisterByParkingId,
  getRegisterByPlacaAndParking,
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

}