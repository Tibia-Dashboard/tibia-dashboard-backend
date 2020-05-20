const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CharacterLogSchema = new Schema({
  character: {
    type: Schema.Types.ObjectId,
    ref: 'Character'
  },
  log : Object
},{
  timestamps: true,
})

module.exports = mongoose.model('CharacterLog', CharacterLogSchema)