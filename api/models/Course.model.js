// Course.model.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const courseSchema = mongoose.Schema({
  subjectId: { type: String },
  subjectName: { type: String},
  courseGroup: { type: String },
  courseSeat: String,
  totalStudent: Number,
  student: [ {
    studentId: String,
    studentName: String
  }],
  score: [Number],
  professor: [{ _id: { type: Schema.Types.ObjectId, ref: 'Person'}, fullName: String }],
  year: String,
  term: String
}, {
  collection: 'course'
}).index({ subjectId: 1, courseGroup: 1}, {unique: true})

var Course = mongoose.model('Course', courseSchema)
module.exports = Course
