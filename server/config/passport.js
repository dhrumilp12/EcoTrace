const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const User = require('../models/user');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const crypto = require('crypto');
const { createUser } = require('../utils/userManagement');


passport.initialize(); // Ensure Passport is initialized

// Define how to serialize and deserialize the user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET
};

// JWT Strategy
passport.use(new JwtStrategy(options, async (jwt_payload, done) => {
  try {
    const user = await User.findById(jwt_payload.id);
    return done(null, user ? user : false);
  } catch (error) {
    return done(error, false);
  }
}));

// Google OAuth Strategy
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const email = profile.emails[0].value;
      const usernameDerived = profile.displayName.replace(/\s+/g, '');
      let user = await User.findOne({ email });
      if (!user) {
        user = await createUser({
          username: usernameDerived,
          email,
          googleId: profile.id,
          password: `gid-${crypto.randomBytes(16).toString('hex')}` // safe placeholder
        });
      }
      done(null, user);
    } catch (error) {
      done(error, null);
    }
}));
