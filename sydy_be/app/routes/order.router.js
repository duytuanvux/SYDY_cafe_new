var express = require('express');
var router = express.Router();

var OrderController = require('../controllers/order.controller');


router.post('/create-order', OrderController.order)
router.get('/user/:user_id', OrderController.getOrderByUserId);
router.get('/get-all-orders', OrderController.getAllOrder);
router.put('/update-status/:orderId', OrderController.updateOrderStatus);
router.put('/update-shipper/:orderId', OrderController.updateOrderShipper);
router.get('/order-need-action/', OrderController.orderNeedAction);
router.get('/get-order-by-order_id/:order_id', OrderController.getOrderByOrderId);


module.exports = router;