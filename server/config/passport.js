/*
 * This passport file is responsible for the Authorization
 * and the general implementation of handling passwords random
 * authentication!
 */

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

// Configure passport.js to use the local strategy
passport.use(new LocalStrategy(
  function(username, password, done) {
    User.findOne({ username: username }, function (err, user) {
      if (err) return done(err);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      user.authenticate(password, (err, user, info) => {
        if (user) return done(null, user);
        if (info.name === 'IncorrectPasswordError') {
          return done(null, false, {message: 'Incorrect password.'});
        }
      });
    });
  }
));

passport.serializeUser((user, done) => done(null, user.username));

passport.deserializeUser((username, done) => {
  User.findOne({ username: username })
    .then(user => done(null, user))
    .catch(err => console.log(`Error deserialising the user: ${err}`));
});

module.exports = passport;
