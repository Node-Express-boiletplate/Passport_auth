const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../model/user");

const opt = {};
opt.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opt.secretOrKey = process.env.JWT_SECRET;

//used by the authenticated requests to deserialize the user,
//fetch user details from the jwt

passport.use(
  new JwtStrategy(opt, function (jwt_payload, done) {
    //check against the DB only if necessary
    //can be avoided if you dont wnat ot fecth user details in each request
    User.findOne({ _id: jwt_payload._id }, function (err, user) {
      if (err) {
        return done(err, false);
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);
