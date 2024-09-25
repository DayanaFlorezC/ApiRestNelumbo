const validFieldsAllowsUpdate = async (fieldsAllows, dataUpdate) =>{
    try{

        const obj = {}

        for (const key in dataUpdate) {
            if (Object.prototype.hasOwnProperty.call(dataUpdate, key)) {
                const element = dataUpdate[key];
                if(fieldsAllows.includes(key)) obj[key]=element
            }
        }

        return obj
        
    }catch(err){
        console.log(err)
        return false
    }
}

module.exports = validFieldsAllowsUpdate