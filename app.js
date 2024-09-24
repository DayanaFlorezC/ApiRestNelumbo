const express = require('express')
const cors = require('cors')
require('dotenv').config();

//import routes
const userRoute = require('./src/routes/userRoute')
const parkingRoute = require('./src/routes/parkingRoute')
const registerRoute = require('./src/routes/registerRouter')
const indicadorRoute = require('./src/routes/indicadorRoute')


const conectDB = require('./src/config/db')
const iniciarSeeders = require('./src/utils/seeder')


const app = express();
const port = process.env.PORT || 8000

//connect to DB
conectDB()

//iniciar seeaders 
//iniciarSeeders()



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: '*'
}
));

//test route
app.get('/', (req, res) => {
    res.send('Hola Mundo')
})

//routes
app.use('/api', userRoute)
app.use('/api', parkingRoute)
app.use('/api', registerRoute)
app.use('/api', indicadorRoute)

app.use((req, res, next) => {
  res.status(404).json({
    error: 'Ruta no encontrada',
    code: 404
  });
});


app.listen(port, () => {
    console.log('server running on port ' + port)
})