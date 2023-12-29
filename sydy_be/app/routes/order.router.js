var express = require('express');
var router = express.Router();

var OrderController = require('../controllers/order.controller');


router.post('/create-order', OrderController.order)
router.put('/update-status/:orderId', OrderController.updateOrderStatus);
router.get('/user/:user_id', OrderController.getOrderByUserId);


module.exports = router;