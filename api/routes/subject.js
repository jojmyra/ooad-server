const express = require('express')
const router = express.Router()

const SubjectController = require('../controllers/subject')

router.get(`/`, SubjectController.getAll)
router.post(`/`, SubjectController.add)
router.delete(`/:_id`, SubjectController.delete)

module.exports = router