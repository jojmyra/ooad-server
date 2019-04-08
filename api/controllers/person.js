const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Student = require('../models/Student.model')
const Professor = require('../models/Professor.model')
const Official = require('../models/Officials.model')
const Person = require('../models/Person.model')
const sercretKey = global.gConfig.secretKey

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
        res.status(401).json({auth: false, message: 'ไม่ใส่ token'})
    }
}

exports.login = (req, res, next) => {
    console.log(req.body);
    if (req.body.email && req.body.password ) {
        Person.findOne({ username: req.body.email }).then((person) => {
            bcrypt.compare(req.body.password, person.password, (_err, password) => {
                if (password) {
                    var personDetail = {
                        username: person.username,
                        name: person.firstname+person.lastname,
                        position: person.position
                    }
                    var token = jwt.sign(personDetail, sercretKey)
                    res.status(200).json({ auth: true, accessToken: token})
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
    Person.findOneAndUpdate({id: req.body.id}, personUpdate, () => {
        res.status(200).json({
            message: "Person was edit",
            success: true
        })
    })
}

exports.delete_person = (req, res, next) => {
    Person.findOneAndDelete({id: req.body.id}, () => {
        res.status(200).json({
            message: "Person was delete",
            success: true
        })
    })
}