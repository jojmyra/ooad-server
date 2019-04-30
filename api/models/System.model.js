// System.model.js
const mongoose = require('mongoose')

const systemSchema = mongoose.Schema({
    pk: { type: String, default: "flag"},
    year: String,
    term: String
}, {
  collection: 'system'
})

var System = mongoose.model('System', systemSchema)
module.exports = System