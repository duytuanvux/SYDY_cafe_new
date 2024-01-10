var express = require('express');
var router = express.Router();

var UserController = require('../controllers/user.controller');


router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.get('/userInfo/:user_id', UserController.getUserInfo)
router.post('/updateUserInfo/:user_id', UserController.updateUserInfo)
router.get('/get-all-users', UserController.getAllUser)
router.delete('/deactivate/:user_id', UserController.deactivateUserController)

router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password', UserController.resetPassword);
router.post('/change-password/:user_id', UserController.changePassword);

router.post('/activate/:user_id', UserController.activateUser);
router.post('/deactivate/:user_id', UserController.deActivateUser);





module.exports = router;