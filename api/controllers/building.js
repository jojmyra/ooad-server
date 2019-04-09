const Bulding = require('../models/building.model')

exports.getAll = (req, res, next) => {
    Bulding.find().then((result) => {
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
    Bulding.create(req.body).then(() => {
        res.status(200)
    }).catch(() => {
        res.status(400)
    });
}

exports.edit = (req, res, next) => {

}

exports.delete = (req, res, next) => {
    Bulding.findByIdAndRemove(req.params._id).then(() => {
        res.status(200)
    }).catch(() => {
        res.status(400)
    });
}