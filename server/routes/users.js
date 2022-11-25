const express = require('express');
const UsersControllersProvider = require('../controllers/UsersControllers');
const verifyAdmin = require('../middleware/verifyToken');
const verifyUser = require('../middleware/verifyToken');
const verifyToken = require('../middleware/verifyToken');
const router = express.Router();

// router.get('/checkauthentication', verifyToken, (req,res, next) => {
//     res.send("you are logged in");
// })
// router.get('/checkuser/:id', verifyUser, (req,res, next) => {
//     res.send("you are logged in and update");
// })

router.put('/:id', verifyUser, UsersControllersProvider.update);
router.delete('/:id', verifyUser, UsersControllersProvider.delete);
router.get('/:id', verifyUser, UsersControllersProvider.get);
router.get('/', verifyAdmin ,UsersControllersProvider.getAll);

module.exports = router;