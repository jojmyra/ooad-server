const express = require('express')
const router = express.Router()

const ExamController = require('../controllers/exam')

router.get(`/`, ExamController.getAll)
router.get(`/detail`, ExamController.get)
router.get(`/observer`, ExamController.getExamByObserver)
router.get(`/seat`, ExamController.getExamBySeat)
router.put(`/`, ExamController.edit)
router.post(`/`, ExamController.add)
router.delete(`/:_id`, ExamController.delete)

module.exports = router