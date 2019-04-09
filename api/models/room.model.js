// Room.model.js
var mongoose = require('mongoose')

// eslint-disable-next-line no-unused-vars
var roomSchema = mongoose.Schema({

  buildingId: { type: String, require: true },
  roomName: { type: String, require: true },
  roomType: { type: String, require: true },
  roomFloor: { type: Number, require: true },
  roomplan: [{
    type: [String],
    required: true
  }],
  roomSeat: { type: Number, require: true }
}, {
  collection: 'room'
})

var Room = mongoose.model('Room', roomSchema)
module.exports = Room
