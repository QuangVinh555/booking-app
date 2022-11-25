const express = require('express');
const AuthControllersProvider = require('../controllers/AuthControllers');
const router = express.Router();

router.post('/register', AuthControllersProvider.register);
router.post('/login', AuthControllersProvider.login);

module.exports = router;