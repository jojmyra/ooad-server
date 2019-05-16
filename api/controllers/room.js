const Room = require('../models/Room.model')

exports.getAll = (req, res, next) => {
    Room.find().then((result) => {
        res.status(200).json({
            items: result,
            totalItems: result.length
        })
    }).catch(() => {
        res.status(204).json({ message: 'ไม่มีวิชาในระบบ' })
    });
}

exports.getAllBuilding = (req, res, next) => {
    Room.aggregate([{
        $group: {
            _id: "$buildingId",
            id: { $push : "$_id"},
            room: { $push: "$roomName" },
            roomSeat: {$push: "$roomSeat" },
            roomSeatMax: { $push: "$roomSeatMax"},
            roomSeatRow: { $push: "$roomSeatRow"}
        }
    }]).exec((err, result) => {
        if(err) res.status(204).json({message: "เกิดข้อผิดพลาด"})
        res.status(200).json(result)
    })
}

exports.getByBuilding = (req, res, next) => {
    Room.find(req.query).then((result) => {
        res.status(200).json({
            items: result,
            totalItems: result.length
        })
    }).catch(() => {
        res.status(204).json({ message: 'ไม่มีวิชาในระบบ' })
    });
}

exports.add = (req, res, next) => {
    Room.create(req.body).then(() => {
        res.status(200).json({ message: "เพิ่มข้อมูลสำเร็จ" })
    }).catch(() => {
        res.status(400).json({ message: "เพิ่มข้อมูลไม่สำเร็จ" })
    });
}

exports.edit = (req, res, next) => {
    var id = req.body._id
    delete req.body._id
    Room.findByIdAndUpdate(id, req.body).then((result) => {
        res.status(200).json({message: "แก้ไขข้อมูลสำเร็จ"})
    }).catch((err) => {
        res.status(400).json({message: "แก้ข้อมูลไม่สำเร็จ"})
    });
}

exports.delete = (req, res, next) => {
    Room.findByIdAndRemove(req.params._id).then(() => {
        res.status(200).json({ message: "ลบข้อมูลสำเร็จ" })
    }).catch(() => {
        res.status(400).json({ message: "ไม่สามารถลบข้อมูลได้, กรุณาลองใหม่อีกครั้ง" })
    });
}