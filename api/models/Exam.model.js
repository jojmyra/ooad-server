// Exam.model.js
const mongoose = require('mongoose')

const examSchema = mongoose.Schema({
  course: { type: String },
  building: { type: String },
  room: { type: String },
  observer: [{ type: String }],
  seat: [{
    roomSeat: { type: String },
    student: { type: String }
  }],
  testDate: Date,
  startTime: String,
  endTime: String,
}, {
    collection: 'examination'
  })

examSchema.virture()

var Exam = mongoose.model('Exam', examSchema)
module.exports = Exam
