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
    throw new Error(`Error get users: ${error.message}`);
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
    throw new Error(`Error get user: ${error.message}`);
  }
}

const getUserByIdWithoutPop = async (id) => {
  try {
    const user = await User.findById(id)
    return user
  } catch (error) {
    throw new Error(`Error get user sin populate: ${error.message}`);

  }
}

const updateUser = async (userId, updateData) => {
  try {
    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true, fields: {
        password: 0
      }
    }).populate('parkings')
    return user
  } catch (error) {
    throw new Error(`Error update user: ${error.message}`);

  }
}


const deleteUser = async (userId) => {
  try {
    const user = await User.findByIdAndDelete(userId)
    return user
  } catch (error) {
    throw new Error(`Error delete user: ${error.message}`);

  }
}


//?link partnert to parking
const linkUserParking = async (userId, parkingId) => {
  try {

    const parkingObjectId = new mongoose.Types.ObjectId(parkingId)

    const user = await User.findByIdAndUpdate(userId, {
      $push: { parkings: parkingObjectId }
    },
      { new: true }).populate('parkings')

    return user

  } catch (error) {
    throw new Error(`Error link parking user: ${error.message}`);
  }
}

const unlinkUserParking = async (parkingId, userId) => {
  try {
    const ParkingIdObj = new mongoose.Types.ObjectId(parkingId)

    const userUpdated = await User.findByIdAndUpdate(userId, {
      $pull: { parkings: ParkingIdObj }
    }, { new: true }).populate('parkings')

    return userUpdated

  } catch (error) {
    throw new Error(`Error unlink parking user: ${error.message}`);
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
  unlinkUserParking,
  getUserByIdWithoutPop
}