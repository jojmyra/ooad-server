const express = require('express')
const router = express.Router()

const ExamController = require('../controllers/exam')

router.get(`/`, ExamController.getAll)
router.put(`/`, ExamController.edit)
router.post(`/`, ExamController.add)
router.delete(`/:_id`, ExamController.delete)

module.exports = router