const db = require('../common/connect');

function create(orderData) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO `order` SET ?';
      db.query(sql, orderData, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
function updateStatus(order_id,newStatusCode ) {
    return new Promise((resolve, reject) => {
        const sql = 'UPDATE `order` SET status_code = ? WHERE order_id = ? ';
      db.query(sql, [newStatusCode, order_id], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
 function getAllOrdersByUserId(user_id) {
    return new Promise((resolve, reject) => {
      const sql = `
      SELECT o.*, oi.item_id, i.id AS item_id, i.name, oi.quantity, oi.note, f.rating
      FROM \`order\` o
      LEFT JOIN order_item oi ON o.order_id = oi.order_id
      LEFT JOIN item i ON oi.item_id = i.id
      LEFT JOIN feedback f ON o.order_id = f.order_id AND oi.item_id = f.item_id
      WHERE o.user_id = ?;
      `;
      db.query(sql, user_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          // Process the data to group items
          const groupedOrders = groupItems(data);
          resolve(groupedOrders);
        }
      });
    });
  }
  
  function groupItems(orders) {
    const groupedOrders = {};
  
    orders.forEach((order) => {
      const key = order.order_id;
      if (!groupedOrders[key]) {
        groupedOrders[key] = {
          order_id: order.order_id,
          order_date: order.order_date.toISOString().split('T')[0],
          status_code: order.status_code,
          total: parseFloat(order.total),
          shipper_id: order.shipper_id,
          user_id: order.user_id,
          phone: order.phone,
          address: order.address,
          items: [],
        };
      }
  
      groupedOrders[key].items.push({
        id: order.item_id,
        quantity: order.quantity,
        note: order.note,
        rating: order.rating
      });
    });
  
    return Object.values(groupedOrders);
  }
  

  module.exports = { create, updateStatus, getAllOrdersByUserId };

 