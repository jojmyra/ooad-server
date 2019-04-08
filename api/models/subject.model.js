// Subject.model.js
const mongoose = require('mongoose')

const subjectSchema = mongoose.Schema({
  subjectId: String,
  subjectName: String
}, {
  collection: 'subject'
})

var Subject = mongoose.model('Subject', subjectSchema)
module.exports = Subject