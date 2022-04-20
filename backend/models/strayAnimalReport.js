const mongoose = require('mongoose')

const strayAnimalSchema = mongoose.Schema(
    {
        description: {
            type: String,
            required: true,
        },
        image: {
            type: String,
        },
        status: {
            type: String,
            default: 'Pending'
        }
    },
    {
        timestamps: true,
    }
)

const StrayAnimalReport = mongoose.model('StrayAnimalReport', strayAnimalSchema)

module.exports = StrayAnimalReport