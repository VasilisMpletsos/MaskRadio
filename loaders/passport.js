/*
 * This passport file is responsible for the Authorization
 * and the general implementation of handling passwords random
 * authentication!
 */


const passport = require('passport');
const passportLocalMongoose = require("passport-local-mongoose");
const User = require('../models/user');

// configure passport.js to use the local strategy
module.exports = (app) => {

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(User.createStrategy());

  // tell passport how to serialize the user
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    User.findOne({ username: username })
    .then(user => {
      return done(null, user);
    })
    .catch(err => {console.log(`Error deserialising the user: ${err}`)})
  });
}
