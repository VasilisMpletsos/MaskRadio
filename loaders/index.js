const session = require('./session');
const mongoose = require('mongoose');

module.exports = (app) => {

  mongoose.connect('mongodb://localhost:27017/MaskRadio', {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });
  
  session(app, mongoose.connection);
}
