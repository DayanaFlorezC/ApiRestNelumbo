const { find } = require('../entities/registroVehiculo');
const User = require('../entities/user')
const mongoose = require('mongoose')


//? Función para crear un nuevo usuario
const createUser = async (userData) => {
  try {
    const newUser = await User.create(userData);
    return newUser;
  } catch (error) {
    throw new Error(`Error creating user: ${error.message}`);
  }
};

//?login
const loginUser = async (userData) => { 
  try {
    const { email } = userData
    const user = await User.findOne({ email })

  
    if (!user) return false

    return user

  } catch (error) {
    console.log(error)
    throw new Error(`Error login user: ${error.message}`);
  }
}



const getUsers = async (query) => {
  try {

    query.role = "socio"
    const users = await User.find(query, {
      email: "$email",
      _id: "$_id",
      parkings: "$parkings",
      role: "$role",
      createdAt: "$createdAt"
    }).populate('parkings')
    return users
  } catch (error) {
    console.log(error)
  }
}

const getUserById = async (id) => {
  try {
    const user = await User.findById(id, {
      email: "$email",
      _id: "$_id",
      parkings: "$parkings",
      role: "$role",
      createdAt: "$createdAt"
    }).populate('parkings')
    return user
  } catch (error) {
    console.log(error)
  }
}

const getUserByIdWithoutPop = async (id) => {
  try {
    const user = await User.findById(id)
    return user
  } catch (error) {
    console.log(error)
  }
}

const updateUser = async (userId, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, { new: true, fields: {
      password: 0
    } }).populate('parkings')
    return user
  } catch (error) {
    console.log(error)
  }
}


const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId)    
    return user
  } catch (error) {
    console.log(error)
  }
}


//link partnert to parking
const linkUserParking = async (userId, parkingId, userAct) => {
  try {

    const parkingObjectId = new mongoose.Types.ObjectId(parkingId)
    
    const user = await User.findByIdAndUpdate(userId, {
      $push: { parkings: parkingObjectId }
    },
      { new: true }).populate('parkings')

    return user

  } catch (error) {
    console.log(error)
  }
}


module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  linkUserParking,
  getUserByIdWithoutPop
}