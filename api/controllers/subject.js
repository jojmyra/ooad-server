const Subject = require('../models/Subject.model')

exports.getAll = (req, res, next) => {
    Subject.find().sort({subjectId: 1}).then((result) => {
        res.status(200).json({
            items: result,
            totalItems: result.length
        })
    }).catch(() => {
        res.status(204).json({message: 'ไม่มีวิชาในระบบ'})
    });
}

exports.get = (req, res, next) => {
    Subject.findOne(req.body).then((result) => {
        res.status(200).json(result)
    }).catch(() => {
        res.status(204).json({message: 'ไม่มีวิชาในระบบ'})
    });
}

exports.add = (req, res, next) => {
    Subject.create(req.body).then(() => {
        res.status(200).json({message: "เพิ่มข้อมูลสำเร็จ"})
    }).catch(() => {
        res.status(400).json({message: "เพิ่มข้อมูลไม่สำเร็จ"})
    });
}

exports.edit = (req, res, next) => {
    var id = req.body._id
    delete req.body._id
    Subject.findByIdAndUpdate(id, req.body).then((result) => {
        res.status(200).json({message: "แก้ไขข้อมูลสำเร็จ"})
    }).catch((err) => {
        res.status(400).json({message: "แก้ข้อมูลไม่สำเร็จ"})
    });
}

exports.delete = (req, res, next) => {
    Subject.findByIdAndRemove(req.params._id).then(() => {
        res.status(200).json({message: "ลบข้อมูลสำเร็จ"})
    }).catch(() => {
        res.status(400).json({message: "ไม่สามารถลบข้อมูลได้, กรุณาลองใหม่อีกครั้ง"})
    });
}