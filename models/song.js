const mongoose = require('mongoose');

const songSchema = new mongoose.Schema({
  id: {type: String, unique: true},
  title: String,
  description: String,
  thumbnail: String,
  player: {
    embedHtml: String,
    embedHeight: Number,
    embedWidth: Number
  },
  topicCategories: []
})

module.exports = mongoose.model('Song', songSchema);
