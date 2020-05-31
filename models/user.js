/*
 * The module exports the User model for the mongoose database.
 * The user is identified through either of his unique username, googleId,
 * facebookId or instagramId.
 * The plugin passportLocalMongoose assigns the register() function to the User
 * schema so that the password hash and salt are savedin the database.
 */

const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Video = require('./video');

const userSchema = new mongoose.Schema({
  username: {type: String, unique: true},
  role: String,
  googleId: String,
  facebookId: String,
  instagramId: String,
  requestedSongs: [
    {date: date, video: Video.schema}
  ]
})

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);
