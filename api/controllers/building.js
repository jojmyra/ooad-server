const Building = require('../models/Building.model')

exports.getAll = (req, res, next) => {``
    Building.find().sort({buildingId: 1}).then((result) => {
        res.status(200).json({
            items: result,
            totalItems: result.length
        })
    }).catch(() => {
        res.status(204).json({message: 'ไม่มีวิชาในระบบ'})
    });
}

exports.get = (req, res, next) => {
    
}

exports.add = (req, res, next) => {
    Building.create(req.body).then(() => {
        res.status(200).json({message: "เพิ่มข้อมูลสำเร็จ"})
    }).catch(() => {
        res.status(400).json({message: "เพิ่มข้อมูลไม่สำเร็จ"})
    });
}

exports.edit = (req, res, next) => {

}

exports.delete = (req, res, next) => {
    Building.findByIdAndRemove(req.params._id).then(() => {
        res.status(200).json({message: "ลบข้อมูลสำเร็จ"})
    }).catch(() => {
        res.status(400).json({message: "ไม่สามารถลบข้อมูลได้, กรุณาลองใหม่อีกครั้ง"})
    });
}