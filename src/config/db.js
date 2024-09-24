const mongoose = require('mongoose')
require('dotenv').config();

let isConnected = false;

const conectDB = async () => {

    if (isConnected) {
        console.log('Already connected to MongoDB');
        return;
    }


    try {
        const conect = await mongoose.connect(process.env.URI_CONNECTDB);

        isConnected=true

        console.log('conect', 'Base de datos conectada correctamente')

    } catch (error) {
        console.log(error, 'error al conectar la base de datos')
    }

}


module.exports = conectDB