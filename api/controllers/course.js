const Course = require('../models/Course.model')
const Person = require('../models/Person.model')
const Exam = require('../models/Exam.model')

exports.getAll = (req, res, next) => {
    Course.find().populate('professor').sort({
        subjectId: 1
    }).then((result) => {
        res.status(200).json({
            items: result,
            totalItems: result.length
        })
    }).catch(() => {
        res.status(204).json({
            message: 'ไม่มีวิชาในระบบ'
        })
    });
}

exports.get = (req, res, next) => {
    Course.findById(req.query._id).populate('person', 'firstname lastname').populate('professor', 'firstname lastname').then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json({
            message: 'ไม่สามารถเรียกดูข้อมูลได้ขณะนี้, กรุณาลองใหม่อีกครั้ง'
        })
    });
}

exports.getAllSubjects = (req, res, next) => {
    Course.aggregate([{
        $group: {
            _id: "$subjectId",
            id: {
                $push: "$_id"
            },
            subject: {
                $push: "$subjectName"
            },
            course: {
                $push: "$courseGroup"
            },
            student: {
                $push: "$student"
            },
            totalStudent: {
                $push: "$totalStudent"
            }
        }
    }]).exec((err, result) => {
        if (err) res.status(204).json({
            message: "เกิดข้อผิดพลาด"
        })
        res.status(200).json(result)
    })
}

exports.getSubject = (req, res, next) => {
    Course.find({
        subjectId: req.params.subjectId
    }).then((result) => {
        res.status(200).json(result)
    }).catch(() => {
        res.status(204).json({
            message: 'ไม่มีวิชาในระบบ'
        })
    });
}

exports.add = (req, res, next) => {
    Course.create(req.body).then(() => {
        res.status(200).json({
            message: "เพิ่มข้อมูลสำเร็จ"
        })
    }).catch(() => {
        res.status(400).json({
            message: "เพิ่มข้อมูลไม่สำเร็จ"
        })
    });
}

exports.addOneStudentToCourse = (req, res, next) => {
    Person.findOne({
        username: req.body.studentId,
        status: "นิสิต"
    }).then(result => {
        if (result) {
            Course.findOne({
                _id: req.body._id,
                student: req.body.studentId
            }, 'student').then((result) => {
                if (!result) {
                    Course.findByIdAndUpdate(req.body._id, {
                        $addToSet: {
                            student: req.body.studentId
                        }
                    }).then((result) => {
                        res.status(200).json({
                            message: "เพิ่มข้อมูลสำเร็จ"
                        })
                    }).catch((err) => {
                        res.status(400).json({
                            message: "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง"
                        })
                    });
                } else {
                    res.status(200).json({
                        message: "นิสิตอยู่ในรายวิชานี้แล้ว"
                    })
                }
            }).catch((err) => {
                res.status(400).json({
                    message: "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง"
                })
            });
        } else {
            res.status(200).json({
                message: "รหัสนิสิตไม่ถูกต้อง"
            })
        }
    }).catch(err => {
        res.status(400).json({
            message: "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง"
        })
    })
}

exports.addOneProfessorToCourse = (req, res, next) => {
    Person.findById(req.body.professorId).then(result => {
        if (result) {
            Course.findOne({
                _id: req.body._id,
                professor: {
                    $in: req.body.professorId
                }
            }, 'professor').then((result) => {
                if (!result) {
                    Course.findByIdAndUpdate(req.body._id, {
                        $addToSet: {
                            professor: req.body.professorId
                        }
                    }).then((result) => {
                        res.status(200).json({
                            message: "เพิ่มข้อมูลสำเร็จ"
                        })
                    }).catch((err) => {
                        res.status(400).json({
                            message: "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง"
                        })
                    });
                } else {
                    res.status(200).json({
                        message: "อาจารย์อยู่ในรายวิชานี้แล้ว"
                    })
                }
            }).catch((err) => {
                res.status(400).json({
                    message: "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง"
                })
            });
        } else {
            res.status(200).json({
                message: "รหัสอาจารย์ไม่ถูกต้อง"
            })
        }
    }).catch(err => {
        res.status(400).json({
            message: "เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง"
        })
    })
}

exports.edit = (req, res, next) => {
    var id = req.body._id
    delete req.body._id
    Course.findByIdAndUpdate(id, req.body).then((result) => {
        res.status(200).json({
            message: "แก้ไขข้อมูลสำเร็จ"
        })
    }).catch((err) => {
        res.status(400).json({
            message: "แก้ข้อมูลไม่สำเร็จ"
        })
    });
}

exports.delete = (req, res, next) => {
    Course.findById(req.params._id).then((result) => {
        Exam.find({
            subjectId: result.subjectId,
            courseGroup: result.courseGroup
        }).remove().exec((err, response) => {
            Course.findByIdAndRemove(req.params._id).then(() => {
                res.status(200).json({
                    message: "ลบข้อมูลสำเร็จ"
                })
            }).catch(() => {
                res.status(400).json({
                    message: "ไม่สามารถลบข้อมูลได้, กรุณาลองใหม่อีกครั้ง"
                })
            });
        })
    }).catch((err) => {

    })

}