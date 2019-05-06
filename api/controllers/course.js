const Course = require('../models/Course.model')

exports.getAll = (req, res, next) => {
    Course.find().then((result) => {
        res.status(200).json({
            items: result,
            totalItems: result.length
        })
    }).catch(() => {
        res.status(204).json({ message: 'ไม่มีวิชาในระบบ' })
    });
}

exports.getAllSubjects = (req, res, next) => {
    Course.aggregate([{
        $group: {
            _id: "$subjectId",
            course: { $push: "$courseGroup" },
            totalStudent: { $push: "$totalStudent" }
        }
    }]).exec((err, result) => {
        if (err) res.status(204).json({message: "เกิดข้อผิดพลาด"})
        res.status(200).json(result)
    })
    // Course.find({}, 'subjectId courseGroup totalStudent').then((result) => {
    //     res.status(200).json(result)
    // }).catch(() => {
    //     res.status(204).json({message: 'ไม่มีวิชาในระบบ'})
    // });
}

exports.getSubject = (req, res, next) => {
    Course.find({ subjectId: req.params.subjectId }).then((result) => {
        res.status(200).json(result)
    }).catch(() => {
        res.status(204).json({ message: 'ไม่มีวิชาในระบบ' })
    });
}

exports.add = (req, res, next) => {
    Course.create(req.body).then(() => {
        res.status(200).json({ message: "เพิ่มข้อมูลสำเร็จ" })
    }).catch(() => {
        res.status(400).json({ message: "เพิ่มข้อมูลไม่สำเร็จ" })
    });
}

exports.edit = (req, res, next) => {

}

exports.delete = (req, res, next) => {
    Course.findByIdAndRemove(req.params._id).then(() => {
        res.status(200).json({ message: "ลบข้อมูลสำเร็จ" })
    }).catch(() => {
        res.status(400).json({ message: "ไม่สามารถลบข้อมูลได้, กรุณาลองใหม่อีกครั้ง" })
    });
}