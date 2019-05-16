// Building.model.js
var mongoose = require('mongoose')

var buildingSchema = mongoose.Schema({

  buildingId: { type: String, require: true, unique: true },
  buildingName: { type: String, require: true, unique: true }
}, {
  collection: 'building'
})

var Building = mongoose.model('Building', buildingSchema)
module.exports = Building

/*
  buildingId: { type: String, require: true, unique: true },
  buildingName: { type: String, require: true },
  buildingFloor: { type: String, require: true },
  room: [ {
    roomName: { type: String, require: true },
    roomType: { type: String, require: true },
    roomFloor: { type: Number, require: true },
    roomSeats: [{
      type: [String],
      required: true
    }],
    roomSeatAvialable: { type: Number, require: true }
  }]
*/