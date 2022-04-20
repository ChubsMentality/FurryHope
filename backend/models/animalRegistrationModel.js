const mongoose = require('mongoose')

registerAnimalSchema = mongoose.Schema(
    {
        animalType: {
            type: String,
            required: true,
        },

        registrationType: {
            type: String,
            required: true,
        },

        name: {
            type: String,
            required: true,
        },
        
        contactNo: {
            type: String,
            required: true,
        },

        lengthOfStay: {
            type: String,
            required: true,
        },

        address: {
            type: String,
            required: true,
        },

        animalName:{
            type: String,
            required: true,
        },

        animalBreed: {
            type: String,
            required: true,
        },

        animalAge: {
            type: String,
            required: true,
        },
        
        animalColor: {
            type: String,
            required: true,
        },

        animalSex: {
            type: String,
            required: true,
        },

        date: {
            type: String,
            required: true,
        },

        registered: {
            type: String,
            default: 'Not Registered',
        },
        
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User',
        },
    },
    {
        timestamps: true,
    }
)

const RegisterAnimal = mongoose.model('RegisterAnimal', registerAnimalSchema)
module.exports = RegisterAnimal