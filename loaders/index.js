const session = require('./session');
const mongoose = require('mongoose');
const passport = require('./passport');

module.exports = (app) => {

  mongoose.connect('mongodb://localhost:27017/MaskRadio', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  session(app, mongoose.connection);
  passport(app);
}
