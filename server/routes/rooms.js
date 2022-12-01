const express = require('express');
const RoomControllersProvider = require('../controllers/RoomsControllers');
const verifyAdmin = require('../middleware/verifyToken');
const router = express.Router();

router.post('/:hotelId', verifyAdmin, RoomControllersProvider.create);
router.put('/availability/:id', RoomControllersProvider.updateRoomAvailability);
router.put('/:id', verifyAdmin, RoomControllersProvider.update);
router.delete('/:id', verifyAdmin, RoomControllersProvider.delete);
router.get('/:id', RoomControllersProvider.getRoom);
router.get('/', RoomControllersProvider.getAllRooms);

module.exports = router;