const passportJWT = require('passport-jwt');
const JwtStrategy = passportJWT.Strategy;
const ExtractJwt = passportJWT.ExtractJwt;
const User = require('../models/User');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
}

const jwtStrategy = new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    const user = await User.findOne({ _id: jwtPayload.sub });
    if (!user) return done(null, false)
    return done(null, user)
})

module.exports = jwtStrategy