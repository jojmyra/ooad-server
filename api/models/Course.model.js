// Course.model.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const courseSchema = mongoose.Schema({
  subjectId: { type: String },
  subjectName: { type: String},
  courseGroup: { type: String },
  courseSeat: String,
  totalStudent: Number,
  student: [{ type: String, unique: true, ref: 'Person' } ],
  score: [Number],
  professor: [ { type: Schema.Types.ObjectId, ref: 'Person', require: true }],
  year: String,
  term: String
}, {
  toObject: { virtuals: true },
  toJSON: { virtuals: true },
  collection: 'course'
}).index({ subjectId: 1, courseGroup: 1}, {unique: true})

courseSchema.virtual('person', {
  ref: 'Person',
  localField: 'student',
  foreignField: 'username'
})

var Course = mongoose.model('Course', courseSchema)
module.exports = Course
