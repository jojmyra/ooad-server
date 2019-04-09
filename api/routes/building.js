const express = require('express')
const router = express.Router()

const BuldingController = require('../controllers/building')

router.get(`/`, BuldingController.getAll)
router.post(`/`, BuldingController.add)
router.delete(`/:_id`, BuldingController.delete)

module.exports = router