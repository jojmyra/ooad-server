// Room.model.js
var mongoose = require('mongoose')

// eslint-disable-next-line no-unused-vars
var roomSchema = mongoose.Schema({
  buildingId: { type: String, require: true },
  roomName: { type: String, require: true },
  roomType: { type: String, require: true },
  roomFloor: { type: Number, require: true },
  roomSeat: [[String]],
  roomSeatMax: { type: Number },
  roomSeatRow: { type: Number }
}, {
    collection: 'room'
  })

var Room = mongoose.model('Room', roomSchema)
module.exports = Room
