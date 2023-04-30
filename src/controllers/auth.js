const express = require('express')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const requireAuth = require('../middleware/requireAuth')
const router = express.Router()


router.post('/register', async (req, res) => {
    const { email, username, password } = req.body
    try {

        const hashedPassword = await bcrypt.hash(password, 8)

        const user = new User({ email, username, password: hashedPassword })

        const savedUser = await user.save()
        console.log(user._id);
        const token = jwt.sign({ sub: savedUser._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' })
        return res.status(201).json({ token })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})


router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ email }).select('+password')

        if (user && await bcrypt.compare(password, user.password)) {
            const token = jwt.sign({ sub: user._id.toString() }, process.env.JWT_SECRET, { expiresIn: '1h' })
            return res.status(200).json({ token })
        }
        return res.status(401).json({ message: 'Unauthorized' })
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

router.get('/protected', requireAuth, (req, res) => {
    return res.send(req.user)
})


module.exports = router
