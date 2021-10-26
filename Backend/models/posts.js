const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String},
  readerUsers: { type: [String], required: true  }
});

var ThingModel = mongoose.model('post', postSchema );
module.exports = ThingModel

