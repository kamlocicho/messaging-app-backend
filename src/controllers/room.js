const express = require('express')
const requireAuth = require('../middleware/requireAuth');
const Room = require('../models/Room');

const router = express.Router()


router.get('/:id', requireAuth, async (req, res) => {
    const { id } = req.params

    try {
        const room = await Room.findById(id)

        if (!room.users.includes(req.user._id) && room.isPrivate) return res.status(400).json({ message: 'You need to join this room first' })

        return res.status(200).json({ room })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})

router.post('/create', requireAuth, async (req, res) => {
    const { name } = req.body;

    try {
        const room = new Room({
            name,
            owner: req.user,
            users: [req.user]
        })

        const savedRoom = await room.save()
        return res.status(201).json({ savedRoom })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})

router.post('/join/:id', requireAuth, async (req, res) => {
    const { id } = req.params

    try {
        const room = await Room.findById(id)
        if (!room) return res.status(404).json({ message: 'Room not found' })

        if (room.users.includes(req.user._id)) return res.status(400).json({ message: 'You are already in this room' })
        room.users.push(req.user._id)
        const savedRoom = await room.save()
        return res.status(200).json(savedRoom)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error })
    }
})

module.exports = router