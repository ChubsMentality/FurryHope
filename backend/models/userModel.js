const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

// Schema for the user
const userSchema = mongoose.Schema(
    {
        fullName: {
            type: String,
        },

        email: {
            type: String,
            unique: true,
        },

        contactNo: {
            type: String,
        },

        password: {
            type: String
        },

        animalPreferences: {
            type: [String],
        },

        breedPreferences: {
            type: [String],
        },

        colorPreferences: {
            type: [String],
        },

        animalTypePreferences: {
            type: [String],
        },

        animalGenderPreferences: {
            type: [String],
        },

        verified: {
            type: Boolean,
            default: false,
            required: true,
        },
        
        profilePicture: {
            type: String,
            default: 'https://res.cloudinary.com/drvd7jh0b/image/upload/v1650026769/tcgfy3tbaoowhjfufvob.png'
        },
    },
    {
        timestamps: true,
    }
)

// Encrypting the password before saving it to the db
userSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }

    // Generating a salt (the higher the value, the more secured it is)
    const salt = await bcrypt.genSalt(10);

    // Encrypting the password with the salt 
    this.password = await bcrypt.hash(this.password, salt);
});

// Comparing the entered password with the password inside the database
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model('User', userSchema);

module.exports = User;