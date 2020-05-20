const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CharacterSchema = new Schema({
  name: {
    type: String,
    unique: true,
    trim: true,
    required: true
  },
}, {
  timestamps: true
})

module.exports = mongoose.model('Character', CharacterSchema)