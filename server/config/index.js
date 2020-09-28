const mongoose = require('mongoose');
const passport = require('./passport');

const session = require('express-session')
const MongoStore = require('connect-mongo')(session); // To store the sessionID in the database

const cors = require('cors');
const Ddos = require('ddos')
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const compression = require("compression");

const { v4: uuid } = require('uuid');

module.exports = (app) => {

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
      return uuid() // The unique string identifier for the session
    },
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.use(helmet()); // extra security headers
  app.use(cors()); // accept cross origin requests

  //Ddos attacks protection
  var ddos = new Ddos({burst:50, limit:100})
  app.use(ddos.express);

  //Limiting Requests
  const limiter = rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 1000, // limit each IP to 1000 requests per windowMs
    message:"Too many attempts from this IP, please try again after 10 minutes"
  });
  app.use(limiter);

  //Use compression for faster excecution
  app.use(compression());
}
