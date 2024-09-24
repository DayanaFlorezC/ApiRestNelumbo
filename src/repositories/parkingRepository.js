const Parking = require('../entities/parking')


// Función para crear un nuevo parking
const createParking = async (parkingData) => {
    try {
      const newParking = await Parking.create(parkingData);
      return newParking;
    } catch (error) {
      throw new Error(`Error creating user: ${error.message}`);
    }
  };

  const getParkings = async (query) =>{
    try {
        const parkings = await Parking.find(query)
        return parkings
    } catch (error) {
        console.log(error)
    }
  }

  const getParkingById = async (parkingId) =>{
    try {
        const parking = await Parking.findById(parkingId)
        return parking
    } catch (error) {
        console.log(error)
    }
  }

  const updateParking = async (id, updateData) =>{
    try {
        const parking = await Parking.findByIdAndUpdate(id, updateData, { new: true })
        return parking
    } catch (error) {
        console.log(error)
    }
  }


  const deleteParking = async (id) =>{
    try {
        const parking = await Parking.findByIdAndDelete(id)
        return parking
    } catch (error) {
        console.log(error)
    }
  }



  module.exports={
   createParking,
   getParkings,
   getParkingById,
   updateParking,
   deleteParking
  }