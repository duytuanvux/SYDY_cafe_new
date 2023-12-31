var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user.controller');


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/userInfo/:user_id', UserController.getUserInfo)
router.post('/updateUserInfo/:user_id', UserController.updateUserInfo)
router.get('/get-all-users', UserController.getAllUser)



module.exports = router;