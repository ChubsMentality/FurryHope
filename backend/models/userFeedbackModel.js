const mongoose = require('mongoose')

const userFeedbackSchema = mongoose.Schema(
    {
        name: {
            type: String,
        },
        email: {
            type: String,
        },
        message: {
            type: String,
        }
    },
    {
        timestamps: true,
    }
)

const UserFeedback = mongoose.model('UserFeedback', userFeedbackSchema);
module.exports = UserFeedback 