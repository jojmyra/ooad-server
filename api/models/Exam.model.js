// Exam.model.js
const mongoose = require('mongoose')

const examSchema = mongoose.Schema({
  course : { type: Schema.Types.ObjectId, ref: 'Course' },
  building : { type: Schema.Types.ObjectId, ref: 'Building' },
  room : { type: Schema.Types.ObjectId, ref: 'Room' },
  observer : [{ type: Schema.Types.ObjectId, ref: 'Person' }],
  student : [{ type: Schema.Types.ObjectId, ref: 'Person' }],
  seat : [{
      roomSeat: {type: String},
      student: { type: Schema.Types.ObjectId, ref: 'Person' }
  }],
  testDate: Date,
  startTime: String,
  endTime: String,
}, {
  collection: 'examination'
})

var Exam = mongoose.model('Exam', examSchema)
module.exports = Exam
