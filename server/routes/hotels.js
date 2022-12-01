const express = require('express');
const HotelsControllersProvider = require('../controllers/HotelsControllers');
const verifyAdmin = require('../middleware/verifyToken');
const router = express.Router();

router.post('/', verifyAdmin, HotelsControllersProvider.create);
router.put('/:id', verifyAdmin, HotelsControllersProvider.update);
router.delete('/:id', verifyAdmin, HotelsControllersProvider.delete);
router.get('/countByCity', HotelsControllersProvider.countByCity);
router.get('/countByType', HotelsControllersProvider.countByType);
router.get('/room/:id', HotelsControllersProvider.getHotelRoom);
router.get('/:id', HotelsControllersProvider.get);
router.get('/', HotelsControllersProvider.getAll);


module.exports = router;