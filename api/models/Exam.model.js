// Exam.model.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const examSchema = mongoose.Schema({
  subjectId: { type: String },
  subjectName: { type: String},
  courseGroup: { type: String },
  buildingId: { type: String },
  roomName: { type: String },
  observer: [{ _id: { type: Schema.Types.ObjectId, ref: 'Person'}, fullName: String }],
  seat: [{
    roomSeat: { type: String },
    studentName: { type: String },
    studentId: { type: String }
  }],
  examDate: String,
  timeStart: String,
  timeEnd: String,
}, {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    collection: 'examination'
},)

examSchema.virtual('student', {
  ref: 'Person',
  localField: 'seat.studentId',
  foreignField: 'username'
})

var Exam = mongoose.model('Exam', examSchema)
module.exports = Exam
