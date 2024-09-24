const {check, validationResult} = require('express-validator')


const validateLogin = [

        check("email").notEmpty().withMessage('El email es obligatorio'),
        check("password").notEmpty().withMessage("La contraseña es obligatoria"),

        (req, res, next) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            next(); 
        }
]

const validateCreateUser =[
    
    check("nombre").notEmpty().withMessage('El nombre es obligatorio'),
    check("email").notEmpty().withMessage('El email es obligatorio'),
    check("password").notEmpty().withMessage("La contraseña es obligatoria"),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); 
    }
]

const validateUserPut = [
    check("nombre").notEmpty().withMessage('El nombre es obligatorio'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); 
    }
    
]

const validateCreateEmail = [
    check("email").notEmpty().withMessage('El email es obligatorio'),
    check("placa").notEmpty().withMessage('El campo placa es obligatorio'),
    check("mensaje").notEmpty().withMessage('El campo mensaje es obligatorio'),
    check("parqueaderoId").notEmpty().withMessage('El campo parqueaderoId es obligatorio'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next(); 
    }

]


module.exports = {
    validateLogin,
    validateCreateUser,
    validateUserPut,
    validateCreateEmail
}