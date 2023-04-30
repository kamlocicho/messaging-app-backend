const mongoose = require('mongoose')

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Room name is required']
    },
    users: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            type: mongoose.Types.ObjectId,
            ref: 'Message'
        }
    ],
    owner: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPrivate: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })


const Room = mongoose.model('Room', roomSchema)


module.exports = Room