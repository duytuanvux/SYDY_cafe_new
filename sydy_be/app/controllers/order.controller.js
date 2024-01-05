const Order = require("../models/order.model");
const OrderItem = require("../models/orderItem.model");

exports.order = async (req, res) => {
  const orderData = {
    total: req.body.total,
    user_id: req.body.user_id,
    status_code : 1,
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
      discount: item.discount,
      quantity: item.quantity,
      note: `Sugar: ${item.sugar}, Ice: ${item.ice}`,
      price: item.price,
      sub_total: item.subTotal
    }));

    await Promise.all(
      orderItemData.map((itemData) => OrderItem.create(itemData))
    );

    res.status(201).json({ message: "Order created successfully" });
  } catch (err) {
    console.error("Error creating order:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getOrderByUserId = async (req, res) => {
  try {
    const user_id = req.params.user_id;

    const orders = await Order.getAllOrdersByUserId(user_id);

    res.json({ orders });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllOrder = async (req, res) => {
  try {

    const data = await Order.getAllOrders();
    res.json({ data });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateOrderStatus = async (req, res) => {
  const orderId = req.params.orderId;
  const newStatusCode = req.body.status_code;

  try {
    await Order.updateStatus(orderId, newStatusCode); // Assume you have a method in your Order model to update the status
    res.status(200).json({ message: "Order status updated successfully" });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateOrderShipper = async (req, res) => {
  const orderId = req.params.orderId;
  const shipper_id = req.body.shipper_id;

  try {
    await Order.updateShipper(orderId, shipper_id); // Assume you have a method in your Order model to update the status
    res.status(200).json({ message: "Shipper updated successfully" });
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.orderNeedAction = async (req, res) => {
  try {
    const data = await Order.orderNeedAction(); // Assume you have a method in your Order model to update the status
    res.status(200).json({
      success: true,
      message: "Successfully retrieved orders needing action",
      data: data,
    });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    res.status(500).json({
      success: false,
      error: "Internal Server Error",
      message: error.message || "Unknown error",
    });
  }
};

exports.getOrderByOrderId = async (req, res) => {
  try {
    const order_id = req.params.order_id;
    const order = await Order.getOrderByOrderId(order_id);
    res.json({ order });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


