const express = require('express')
const router = express.Router()

const PersonController = require('../controllers/person')

// router.post(`/addStudent`, )
// router.post(`/addProfessor`, )
// router.post(`/addOfficial`, PersonController.add_official)
router.post(`/addStudent`, PersonController.add_student)
router.post(`/addProfessor`, PersonController.add_professor)
router.post(`/login`, PersonController.login)
router.get(`/loginData`, PersonController.getPersonLogin)
router.delete(`/deletePerson`, PersonController.delete_person)

router.get(`/`, PersonController.getAll)
router.get(`/professor`, PersonController.getProfessor)
router.post(`/`, PersonController.add)
router.put(`/`, PersonController.edit_person)
router.delete(`/:_id`, PersonController.delete)

module.exports = router