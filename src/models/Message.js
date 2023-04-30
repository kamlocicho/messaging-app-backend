const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    value: {
        type: String,
        required: 'true'
    }
}, { timestamps: true })


const Message = mongoose.model('Message', messageSchema)


module.exports = Message