const express = require('express')
const router = express.Router()

const SystemController = require('../controllers/system')

router.get(`/`, SystemController.getSystem)
router.put(`/`, SystemController.updateSystem)

module.exports = router