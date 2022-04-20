const mongoose = require('mongoose')

const inventorySchema = mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
        },

        quantity: {
            type: String,
            required: true,
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