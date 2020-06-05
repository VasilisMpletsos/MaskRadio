const mongoose = require('mongoose');
const passport = require('./passport');

const session = require('express-session')
const MongoStore = require('connect-mongo')(session); // To store the sessionID in the database

const { v4: uuid } = require('uuid');

module.exports = (app) => {

  // MONGODB_URI = mongodb://localhost:27017/MaskRadio.
  // Store to .env for easier transition to MongoDB Atlas if needed.
  // Database initialization
  mongoose.connect(process.env.MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
  })
    .then(() => console.log('MongoDB connection established successfully'))
    .catch(err => console.log(err));

  // Session initialization
  app.use(session({
    genid: (req) => {
      return uuid() // The unique string identifier for the session.
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection}),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());
}
