const passport = require("passport")

const requireAuth = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (!user) {
            if (err) return next(err)
            const message = info && info.messaage ? info.message : 'Unauthorized'
            return res.status(401).json({ message })
        }
        req.user = user
        next()
    })(req, res, next)
}

module.exports = requireAuth