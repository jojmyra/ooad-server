const express = require('express')
const router = express.Router()

const RoomController = require('../controllers/room')

router.get(`/`, RoomController.getAll)
router.get(`/building:buildingId?`, RoomController.getByBuilding)
router.post(`/`, RoomController.add)
router.delete(`/:_id`, RoomController.delete)

module.exports = router