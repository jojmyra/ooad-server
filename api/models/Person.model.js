// Person.model.js
var mongoose = require('mongoose')

var personSchema = mongoose.Schema({
  username: { type: String, require: true, unique: true, dropDups: true },
  password: { type: String,  default: "123456" },
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: { type: String, lowercase: true, trim: true, unique: true, dropDups: true },
  faculty: { type: String },
  major: { type: String },
  status: { type: String },
  position: { type: String }
}, {
  collection: 'person'
})

var Person = mongoose.model('Person', personSchema)
module.exports = Person
