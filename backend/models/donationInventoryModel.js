const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema(
    {
        dataItems: {
            type: [Object]
        },

        donatedBy: {
            type: String,
            required: true,
        },

        dateOfDonation: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
)

const DonationInventory = mongoose.model('DonationInventory', inventorySchema)
module.exports = DonationInventory