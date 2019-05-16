const express = require('express')
const router = express.Router()

const CourseController = require('../controllers/course')

router.get(`/`, CourseController.getAll)
router.get(`/subjectList`, CourseController.getAllSubjects)
router.put(`/`, CourseController.edit)
router.post(`/`, CourseController.add)
router.delete(`/:_id`, CourseController.delete)

module.exports = router