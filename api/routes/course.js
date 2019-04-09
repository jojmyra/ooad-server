const express = require('express')
const router = express.Router()

const CourseController = require('../controllers/course')

router.get(`/`, CourseController.getAll)
router.post(`/`, CourseController.add)
router.delete(`/:_id`, CourseController.delete)

module.exports = router