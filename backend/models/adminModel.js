const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


// db schema for the admin 
const adminSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
    }
);

// Encrypting the password before saving it to the database
adminSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next();
    }

    // Generating a salt (the higher the value, the more secured it is)
    const salt = await bcrypt.genSalt(10);

    // Encrypting the password with the salt 
    this.password = await bcrypt.hash(this.password, salt);
});

// Comparing the entered password with the password inside the database
adminSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin; 