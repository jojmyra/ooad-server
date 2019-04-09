// Building.model.js
var mongoose = require('mongoose')

var buildingSchema = mongoose.Schema({

  buildingId: { type: String, require: true, unique: true },
  buildingName: { type: String, require: true }

}, {
  collection: 'building'
})

var Building = mongoose.model('Building', buildingSchema)
module.exports = Building
