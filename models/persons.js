const { urlencoded } = require('express')
const mongoose = require('mongoose')

mongoose.set('strictQuery', false)

personSchema = mongoose.Schema({
    name: {
        type: String,
        minLength: 3
    },
    number: {
        type: String,
        validate: {
        validator: function(v) {
            return /^\d{2,3}-\d{5,}$/.test(v)
        },
        message: (props) => `${props.value}  is not valid`
    }
    }

})

const url = process.env.MONGODB_URL

mongoose.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

mongoose.connect(url, {dbName: 'phonebook'})
.then(() => {
    console.log('Connection Successful !')
})
.catch(err => {
    console.log('A problem occured: ', err)
})

module.exports = mongoose.model('Person', personSchema)
