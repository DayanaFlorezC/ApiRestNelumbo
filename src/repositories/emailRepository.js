const Email = require('../entities/email')


const createEmail = async (data ) =>{
    try {
        const email = await Email.create(data)

        return email
        
    } catch (error) {
        console.log(error)
    }
}


module.exports ={
    createEmail
}