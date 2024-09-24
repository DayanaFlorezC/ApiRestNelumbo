const { check, validationResult } = require('express-validator')


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

const validateCreateUser = [

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

const validateCreateParking = [

    check("nombre")
        .notEmpty().withMessage('El campo nombre es obligatorio'),
    check('costoByhour')
        .notEmpty().withMessage('El campo costoByhour es obligatorio')
        .isFloat({ gt: 0 }).withMessage('El costo por hora debe ser mayor a cero'),
    check('capacidad')
        .notEmpty().withMessage('El campo capacidad es obligatorio')
        .isFloat({ gt: 0 }).withMessage('La capacidad debe ser mayor a cero'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
]


const validateCreateRegistersInOut = [

    check('placa')
        .notEmpty().withMessage('El campo placa debe ser obligatorio')
        .isLength({ min: 6, max: 6 }).withMessage('El campo placa debe tener 6 caracteres')
        .isAlphanumeric().withMessage('El campo placa debe ser un valor alphanumerico'),
    check('idParqueadero').notEmpty().withMessage('El campo idParqueadero debe ser obligatorio'),

    (req, res, next) => {
        const errors = validationResult(req)

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }

        next()
    }
]

module.exports = {
    validateLogin,
    validateCreateUser,
    validateUserPut,
    validateCreateEmail,
    validateCreateParking,
    validateCreateRegistersInOut
}