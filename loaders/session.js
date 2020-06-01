/*
 * The session initiallization function.
 * The MongoStore is responsible for saving the sessionId in the database.
 */

const session = require('express-session')
const MongoStore = require('connect-mongo')(session);

const { v4: uuid } = require('uuid'); // To generate unique random strings

module.exports = (app, mongooseConnection) => {
  app.use(session({
    genid: (req) => {
      return uuid() // The unique string identifier for the session.
    },
    store: new MongoStore({ mongooseConnection: mongooseConnection}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));
};
