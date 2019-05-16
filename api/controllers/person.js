const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Student = require('../models/Student.model')
const Professor = require('../models/Professor.model')
const Official = require('../models/Officials.model')
const Person = require('../models/Person.model')
const sercretKey = global.gConfig.secretKey
const saltRounds = 10

exports.add_official = (req, res, next) => {
    person.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: "Added Officials",
            data: person,
            success: true
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
}

exports.add_student = (req, res, next) => {
    person.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: "Added Student",
            data: person,
            success: true
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
}

exports.add_professor = (req, res, next) => {
    person.save().then(result => {
        console.log(result)
        res.status(201).json({
            message: "Added Professor",
            data: person,
            success: true
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
}

exports.getPersonLogin = (req, res, next) => {
    const accessToken = req.headers.authorization.split(" ")[1];
    if (accessToken) {
        jwt.verify(accessToken, sercretKey, (err, decodedToken) => {
            if (err) res.status(500).json(err)
            res.status(200).json(decodedToken)
        })
    } else {
        res.status(401).json({ auth: false, message: 'ไม่ใส่ token' })
    }
}

exports.login = (req, res, next) => {
    if (req.body.email && req.body.password) {
        Person.findOne({ username: req.body.email }).then((person) => {
            bcrypt.compare(req.body.password, person.password, (_err, password) => {
                if (password) {
                    var personDetail = {
                        username: person.username,
                        name: person.firstname + person.lastname,
                        status: person.status
                    }
                    var token = jwt.sign(personDetail, sercretKey)
                    res.status(200).json({ auth: true, accessToken: token })
                } else {
                    res.status(401).json({
                        success: false,
                        message: "รหัสผ่านผิดพลาด"
                    })
                }
            })
        }).catch((err) => {
            res.status(401).json({
                success: false,
                message: "ไม่พบผู้ใช้ในระบบ"
            })
        });
    }

}

exports.edit_person = (req, res, next) => {
    var id = req.body._id
    delete req.body._id
    Person.findByIdAndUpdate(id, req.body).then((result) => {
        res.status(200).json({message: "แก้ไขข้อมูลสำเร็จ"})
    }).catch((err) => {
        res.status(400).json({message: "แก้ข้อมูลไม่สำเร็จ"})
    });
}

exports.delete_person = (req, res, next) => {
    Person.findOneAndDelete({ id: req.body.id }, () => {
        res.status(200).json({
            message: "Person was delete",
            success: true
        })
    })
}

exports.getAll = (req, res, next) => {
    // var startPage = req.query.startPage
    // var limitPage = req.query.limitPage
    // var skip = limitPage * (startPage - 1)
    // Person.find().sort({status: 1})
    // .skip(skip)
    // .limit(parseInt(limitPage))
    // .then((result) => {
    //     Person.count().then(count => {
    //         res.status(200).json({
    //             items: result,
    //             totalItems: count
    //         })
    //     }).catch(() => {
    //         res.status(204).json({ message: 'ไม่มีข้อมูลในระบบ' })
    //     })

    // }).catch(() => {
    //     res.status(204).json({ message: 'ไม่มีข้อมูลในระบบ' })
    // });

    Person.find().sort({status: 1, username: 1}).then((result) => {
        res.status(200).json({
            items: result,
            totalItems: result.length
        })
    }).catch(() => {
        res.status(204).json({message: 'ไม่มีข้อมูลในระบบ'})
    });
}

exports.add = (req, res, next) => {    
    bcrypt.hash(req.body.password, saltRounds, function (_err, hash) {
        req.body.password = hash
        Person.create(req.body).then(() => {
            res.status(200).json({ message: "เพิ่มข้อมูลสำเร็จ" })
        }).catch(() => {
            res.status(400).json({ message: "เพิ่มข้อมูลไม่สำเร็จ" })
        });
    })
}

exports.delete = (req, res, next) => {
    Person.findByIdAndRemove(req.params._id).then(() => {
        res.status(200).json({message: "ลบข้อมูลสำเร็จ"})
    }).catch(() => {
        res.status(400).json({message: "ไม่สามารถลบข้อมูลได้, กรุณาลองใหม่อีกครั้ง"})
    });
}