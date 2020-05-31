
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
  id: String,
  title: String,
  description: String,
  thumbnail: String,
  player: {
    embedHtml: String,
    embedHeight: Number,
    embedWidth: Number
  }
  topicCategories: []
})

module.exports = mongoose.model('Song', videoSchema);
