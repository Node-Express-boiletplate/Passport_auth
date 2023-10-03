const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy
const User = require("../model/user")

//called during login/signup.
passport.use(new LocalStrategy(User.authenticate()))

//called while after looging in/ signing up to set user details in req.user
passport.serializeUser(User.serializeUser())