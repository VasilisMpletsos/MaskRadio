/*
 * This passport file is responsible for the Authorization
 * and the general implementation of handling passwords random
 * authentication!
 */


const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

// configure passport.js to use the local strategy
passport.use(new LocalStrategy((username, password, done) => {
    User.findOne({ username: username })
      .then( user => {
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (user.password != password) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      })
      .catch(err => {return done(err);});
  }
));

// tell passport how to serialize the user
passport.serializeUser((user, done) => {
  done(null, user.username);
});

passport.deserializeUser((username, done) => {
  db.collection('users').findOne({ username: username })
  .then(user => {
    return done(null, user);
  })
  .catch(err => {console.log(`Error deserialising the user: ${err}`)})
});

module.exports = passport;
