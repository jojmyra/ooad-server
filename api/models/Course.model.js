// Course.model.js
const mongoose = require('mongoose')

const courseSchema = mongoose.Schema({
  subjectId: String,
  courseId: String,
  courseGroup: Number,
  courseSeat: String,
  totalStudent: Number,
  student: [String],
  score: [Number],
  professor: [String],
  year: String,
  term: String
}, {
  collection: 'course'
})

var Course = mongoose.model('Course', courseSchema)
module.exports = Course
