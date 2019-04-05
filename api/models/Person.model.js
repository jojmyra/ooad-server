// Person.model.js
var mongoose = require('mongoose')

var personSchema = mongoose.Schema({
  username: { type: String, require: true, unique: true, dropDups: true },
  password: { type: String, require: true },
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  email: { type: String, require: true, lowercase: true, trim: true, unique: true, dropDups: true },
  faculty: { type: String },
  major: { type: String },
  status: { type: String },
  position: { type: String }
}, {
  collection: 'person'
})

var Person = mongoose.model('Person', personSchema)
module.exports = Person
