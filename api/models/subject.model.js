// Subject.model.js
const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema({
  subjectId: { type: String, unique: true},
  subjectName: { type: String, unique: true}
}, {
  collection: 'subject'
})

var Subject = mongoose.model('Subject', subjectSchema)
module.exports = Subject