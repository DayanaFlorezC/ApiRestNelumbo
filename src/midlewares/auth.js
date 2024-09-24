const jwt = require('jsonwebtoken')
require('dotenv').config()

const authFunction = async (req, res, next) => {

    try {

        const token = req.headers['authorization']

        if (!token) return res.status(401).json({success: false, mensaje: 'No hay token' })

        const tokenWithoutBearer = token.split(' ')[1]

        let decoded;

        if(tokenWithoutBearer=== undefined){
             decoded = jwt.verify(token, process.env.JWT_SECRET);
        }else{
            decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);
        }

        req.user = decoded;
        next()

    } catch (error) {
        console.log(error)
        return res.status(401).json({ success: false, message: 'Acceso denegado. Token no válido.' });
    }

}

module.exports = authFunction; 