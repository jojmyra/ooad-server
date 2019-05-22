//inside exam.test.js
const assert = require('assert');
const Exam = require('../api/models/exam.model');
const Person = require('../api/models/person.model');

var observerId;

describe('สร้างการสอบ', () => {
    var observer = new Person({
        firstname: "ผู้สอน",
        lastname: "สอนสอน",
        username: "arjarn",
        status: "อาจารย์",
        email: "arjarn@go.buu.ac.th"
    })
    var student = new Person({
        firstname: "นิสิต",
        lastname: "เรียนกว่าจะจบ",
        username: "59160548",
        status: "นิสิต",
        email: "59160548@go.buu.ac.th"
    })
    before(done => {
        observer.save().then(result => {
            observerId = result._id
            student.save().then(result => {
                done()
            })
        })
    })

    it('เพิ่มการสอบ observer จาก _id นิสิตจากรหัสนิสิต (username)', (done) => {
        const exam = new Exam({
            subjectId: "88624159-59",
            buildingId: "IF",
            examDate: "4/31/2019",
            timeStart: "09:00",
            timeEnd: "12:00",
            courseGroup: "1",
            subjectName: "Unix Tools and Programming",
            roomName: "3C01",
            seat: [{
                studentId: "59160548",
                roomSeat: "A0"
            }],
            observer: [observerId]
        })
        exam.save()
            .then(() => {
                assert(!exam.isNew);
                Exam.remove(exam)
                done();
            });
    });
});

describe('อ่านข้อมูล Exam จาก Database',() => {
    var examId;
    it('เรียกดูการสอบทั้งหมด', done => {
        const exam = new Exam({
            subjectId: "88624159-59",
            buildingId: "IF",
            examDate: "4/31/2019",
            timeStart: "09:00",
            timeEnd: "12:00",
            courseGroup: "1",
            subjectName: "Unix Tools and Programming",
            roomName: "3C01",
            seat: [{
                studentId: "59160548",
                roomSeat: "A0"
            }],
            observer: [observerId]
        })
        exam.save()
            .then(result => {
                Exam.find({
                    subjectId: "88624159-59",
                    courseGroup: "1"
                }).then(exam => {
                    examId = exam[0]._id
                    if (exam.length > 0) {
                        assert(exam[0].subjectName == "Unix Tools and Programming")
                        done()
                    }
                })
            })
    })

    it('เรียกดูการสอบจากไอดี', done => {
        Exam.findById(examId)
            .then(() => {
                done()
            })
    })

    it('เรียกดูที่นั่งสอบจากรหัสนิสิต', done => {
        Exam.find({
            seat: {
                $elemMatch: {
                    studentId: "59160548"
                }
            }
        }, {
            subjectId: 1,
            subjectName: 1,
            buildingId: 1,
            roomName: 1,
            examDate: 1,
            timeStart: 1,
            timeEnd: 1,
            "seat.$": 1
        }).then((student) => {
            assert(student.seat.roomSeat == "A0");
            done();
        })
    })

    it('เรียกดูข้อมูลผู้คุมสอบ', done => {
        Exam.find({
            observer: { $in: observerId }
        }, {
            subjectId: 1,
            subjectName: 1,
            buildingId: 1,
            roomName: 1,
            examDate: 1,
            timeStart: 1,
            timeEnd: 1
        }).then((result) => {
            done();
        })
    })
})

describe('ลบตึก', () => {
    it('ลบตึกจาก_id', done => {
        const exam = new Exam({
            subjectId: "111111",
            buildingId: "IF",
            examDate: "4/31/2019",
            timeStart: "09:00",
            timeEnd: "12:00",
            courseGroup: "1",
            subjectName: "Testing Software",
            roomName: "3C01",
            seat: [{
                studentId: "59160548",
                roomSeat: "A0"
            }],
            observer: [observerId]
        })
        exam.save()
        Exam.remove(exam)
            .then(() => {
                done()
            })
    })
})