const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'User with this email already exists']
    },
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username is already taken']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        select: false
    },
    rooms: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Room'
        }
    ]
}, { timestamps: true })

const User = mongoose.model('User', userSchema)

module.exports = User