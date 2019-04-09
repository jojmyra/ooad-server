const Room = require('../models/room.model')

exports.getAll = (req, res, next) => {
    Room.find().then((result) => {
        res.status(200).json({
            items: result,
            totalItems: result.length
        })
    }).catch(() => {
        res.status(204).json({message: 'ไม่มีวิชาในระบบ'})
    });
}

exports.getByBuilding = (req, res, next) => {
    Room.find(req.query).then((result) => {
        res.status(200).json({
            items: result,
            totalItems: result.length
        })
    }).catch(() => {
        res.status(204).json({message: 'ไม่มีวิชาในระบบ'})
    });
}

exports.add = (req, res, next) => {
    Room.create(req.body).then(() => {
        res.status(200)
    }).catch(() => {
        res.status(400)
    });
}

exports.edit = (req, res, next) => {

}

exports.delete = (req, res, next) => {
    Room.findByIdAndRemove(req.params._id).then(() => {
        res.status(200)
    }).catch(() => {
        res.status(400)
    });
}