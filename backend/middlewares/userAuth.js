const { isValidObjectId } = require('mongoose');
const ResetPasswordToken = require('../models/resetPasswordToken');
const User = require('../models/userModel')

const isResetTokenValid = async (req, res, next) => {
    const { token, id } = req.query;
    if (!token || !id) {
        throw new Error('Invalid Request')
    }

    if (!isValidObjectId(id)) {
        throw new Error('Invalid User Id')
    }

    // Check for the user
    const user = await User.findById(id)

    if (!user) {
        throw new Error('User not found.')
    }

    // Finds the user's reset token based on the owner
    const resetToken = await ResetPasswordToken.findOne({ owner: user._id })

    if (!resetToken) {
        throw new Error('Reset password token not found.')
    }

    // To check if the token from the request is equal to the one inside the database.
    const isValid = await resetToken.compareToken(token)

    if (!isValid) {
        throw new Error('Reset token is invalid')
    }

    req.user = user
    next()
}

module.exports = { isResetTokenValid }