
const adminAuth = async (req, res, next )=>{
    try {

        if(req.user.role !== 'admin') return res.status(401).json({mensaje: 'Acceso denegado, No tiene permisos para realizar esta petición'})
        
            next()
    } catch (error) {
        console.log(error)
        res.status(401).json({mensaje: 'Acceso denegado, No tiene permisos para realizar esta petición'})
    }

}

module.exports = adminAuth