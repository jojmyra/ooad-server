const System = require('../models/System.model')

exports.updateSystem = (req, res, next) => {
    System.findOneAndUpdate({pk: 'flag'}, req.body , { upsert: true}).then((result) => {
        res.status(200).json({message: "แก้ไขข้อมูลในระบบสำเร็จ"},result)
    }).catch((err) => {
        console.log(err);
        res.status(400).json({message: 'เกิดข้อผิดพลาดกรุณาลองใหม่อีกครั้ง'})
    });
}

exports.getSystem = (req, res, next) => {
    System.findOne({pk: 'flag'}).then((result) => {
        res.status(200).json(result)
    }).catch((err) => {
        res.status(204).json({message: 'ไม่มีข้อมูลตั้งค่าในระบบ'})
    });
}