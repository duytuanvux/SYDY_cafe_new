const Order = require('../models/order.model');
const OrderItem = require('../models/orderItem.model');

exports.order = async (req, res) => {
    const orderData = {
        total: req.body.total,
        user_id: req.body.user_id,
        order_date: new Date(),
        phone: req.body.phone,
        address: req.body.address,
    };

    try {
        const orderResult = await Order.create(orderData);
        const orderId = orderResult.insertId;

        const orderItemData = req.body.items.map((item) => ({
            order_id: orderId,
            item_id: item.id,
            quantity: item.quantity,
            note: item.note,
        }));

        await Promise.all(orderItemData.map(itemData => OrderItem.create(itemData)));

        res.status(201).json({ message: 'Order created successfully' });
    } catch (err) {
        console.error('Error creating order:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.updateOrderStatus = async (req, res) => {
    const orderId = req.params.orderId;
    const newStatusCode = req.body.status_code;

    try {
        await Order.updateStatus(orderId, newStatusCode); // Assume you have a method in your Order model to update the status
        res.status(200).json({ message: 'Order status updated successfully' });
    } catch (err) {
        console.error('Error updating order status:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

exports.getOrderByUserId = async (req, res) => {
    try {
      const user_id = req.params.user_id;

      const orders = await Order.getAllOrdersByUserId(user_id);
                                
      res.json({ orders });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };