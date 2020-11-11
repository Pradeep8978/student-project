const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const LocalStrategy = require('passport-local').Strategy;
const GoogleTokenStrategy = require('passport-google-token').Strategy;
const FacebookTokenStrategy = require('passport-facebook-token');
const config = require('./configuration');
const Users = require('./models/users');


const tokenExtractor = req => {
  let token = null;
  console.log('HEADERS =>', req.headers)
  token = req.headers.authorization;
  return token;

}

// JSON WEB TOKENS STRATEGY
passport.use(new JwtStrategy({
  jwtFromRequest: tokenExtractor,
  secretOrKey: config.JWT_SECRET,
  passReqToCallback: true
}, async (req, payload, done) => {
  var user;
  try {
    // Find the user specified in token
    console.log('payload =>', payload)
      user = await Users.findById(payload.sub);
      if (!user) {
        return done(null, false);
      }
      done(null, user);
    // Otherwise, return the
  } catch (error) {
    done(error, false);
  }
}));

// LOCAL STRATEGY
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, email, password, done) => {
  let user;
  try {
      user = await Users.findOne({ "email": email });
      if (!user) {
        return done(null, false);
      }
      const isMatch = await user.isValidPassword(password);
      console.log('MATCH =>', isMatch)
      if (!isMatch) {
        return done(null, false);
      }
      done(null, user);
    // If not, handle it
  } catch (error) {
    done(error, false);
  }
}));

