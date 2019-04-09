const express = require('express')
const router = express.Router()

const BuildingController = require('../controllers/building')

router.get(`/`, BuildingController.getAll)
router.post(`/`, BuildingController.add)
router.delete(`/:_id`, BuildingController.delete)

module.exports = router