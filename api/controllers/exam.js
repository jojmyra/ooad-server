const Exam = require('../models/Exam.model')

exports.getAll = (req, res, next) => {
    Exam.find().then((result) => {
        res.status(200).json({
            items: result,
            totalItems: result.length
        })
    }).catch(() => {
        res.status(204).json({
            message: 'ไม่มีข้อมูลในระบบ'
        })
    });
}

exports.get = (req, res, next) => {
    Exam.findById(req.query._id).populate('observer', 'firstname lastname').populate('student', 'firstname lastname').then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(204).json({
            message: 'ไม่มีข้อมูลในระบบ'
        })

    });
}

exports.add = (req, res, next) => {
    Exam.create(req.body).then(() => {
        res.status(200).json({
            message: "เพิ่มข้อมูลสำเร็จ"
        })
    }).catch(() => {
        res.status(400).json({
            message: "เพิ่มข้อมูลไม่สำเร็จ"
        })
    });
}

exports.edit = (req, res, next) => {
    var id = req.body._id
    delete req.body._id
    Exam.findByIdAndUpdate(id, req.body).then((result) => {
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
    Exam.findByIdAndRemove(req.params._id).then(() => {
        res.status(200).json({
            message: "ลบข้อมูลสำเร็จ"
        })
    }).catch(() => {
        res.status(400).json({
            message: "ไม่สามารถลบข้อมูลได้, กรุณาลองใหม่อีกครั้ง"
        })
    });
}

exports.getExamByObserver = (req, res, next) => {
    Exam.find({
        observer: { $in: req.query._id }
    }, {
        subjectId: 1,
        subjectName: 1,
        buildingId: 1,
        roomName: 1,
        examDate: 1,
        timeStart: 1,
        timeEnd: 1
    }).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json(err)
    });
}

exports.getExamBySeat = (req, res, next) => {
    Exam.find({
        seat: {
            $elemMatch: {
                studentId: req.query.studentId
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
    }).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(400).json(err)
    });
}