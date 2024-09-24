const User = require('../entities/user')

const iniciarSeeders = async () => {

    try {
        const adminExist = await User.findOne({ email: 'admin@mail.com' })

        if (!adminExist) {
            await User.create({
                nombre: 'Admin',
                email: 'admin@mail.com',
                password: process.env.PASSWORD_ADMIN_DEFAULT,
                parkings: [],
                role: "admin",
                createdAt: new Date(),
                __v: 0
            })

        }

    } catch (err) {
        console.log(err)
    }



}

module.exports = iniciarSeeders