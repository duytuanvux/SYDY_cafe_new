const db = require("../common/connect");

function create(orderData) {
  return new Promise((resolve, reject) => {
    const sql = "INSERT INTO `order` SET ?";
    db.query(sql, orderData, (err, data) => {
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
      SELECT o.*, os.status_name, oi.item_id, i.id AS item_id, i.name, oi.note, oi.quantity, oi.price, oi.sub_total,  f.rating, p.method_name,
      s.fullname AS shipper_name
      FROM \`order\` o
      LEFT JOIN order_status os ON o.status_code = os.status_code
      LEFT JOIN order_item oi ON o.order_id = oi.order_id
      LEFT JOIN item i ON oi.item_id = i.id
      LEFT JOIN feedback f ON o.order_id = f.order_id AND oi.item_id = f.item_id
      LEFT JOIN shipper s ON o.shipper_id = s.shipper_id
      LEFT JOIN payment_method p ON o.payment_method_id = p.payment_method_id
      WHERE o.user_id = ?;
      `;
    db.query(sql, user_id, (err, data) => {
      if (err) {
        reject(err);
      } else {
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
        order_date: order.order_date.toLocaleDateString('en-GB', {
          hour: 'numeric',
          minute: 'numeric'
      }),
        status: {
          code: order.status_code,
          name: order.status_name,
        },
        shipper: {
          shipper_id: order.shipper_id,
          name: order.shipper_name,
        },
        total: parseFloat(order.total),
        payment_method: {
          id : order.payment_method_id,
          name : order.method_name
        },
        isPaid : order.isPaid,
        user_id: order.user_id,
        phone: order.phone,
        address: order.address,
        items: [],
      };
    }

    groupedOrders[key].items.push({
      id: order.item_id,
      name : order.name,
      price: order.price,
      quantity: order.quantity,
      note: order.note,
      sub_total : order.sub_total,
      rating: order.rating,
    });
  });

  return Object.values(groupedOrders);
}

function getAllOrders() {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT o.*, os.status_name, oi.item_id, i.id AS item_id, i.name, oi.note, oi.quantity, oi.price, oi.sub_total,  f.rating, p.method_name,
    s.fullname AS shipper_name
    FROM \`order\` o
    LEFT JOIN order_status os ON o.status_code = os.status_code
    LEFT JOIN order_item oi ON o.order_id = oi.order_id
    LEFT JOIN item i ON oi.item_id = i.id
    LEFT JOIN feedback f ON o.order_id = f.order_id AND oi.item_id = f.item_id
    LEFT JOIN shipper s ON o.shipper_id = s.shipper_id
    LEFT JOIN payment_method p ON o.payment_method_id = p.payment_method_id
      `;
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      } else {
        const groupedOrders = groupItems(data);
        resolve(groupedOrders);
      }
    });
  });
}
function updateStatus(order_id, newStatusCode) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE `order` SET status_code = ? WHERE order_id = ? ";
    db.query(sql, [newStatusCode, order_id], (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
function updateShipper(order_id, shipper_id) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE `order` SET shipper_id = ? WHERE order_id = ? ";
    db.query(sql, [shipper_id, order_id], (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
function orderNeedAction() {
  return new Promise((resolve, reject) => {
    const sql = "SELECT COUNT(*) AS order_count FROM `order`  WHERE status_code = 1 ";
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function getOrderByOrderId(order_id) {
  return new Promise((resolve, reject) => {
    const sql = `
    SELECT o.*, os.status_name, oi.item_id, i.id AS item_id, i.name, oi.quantity, oi.price, oi.sub_total, oi.note, f.rating, 
    s.fullname AS shipper_name
    FROM \`order\` o
    LEFT JOIN order_status os ON o.status_code = os.status_code
    LEFT JOIN order_item oi ON o.order_id = oi.order_id
    LEFT JOIN item i ON oi.item_id = i.id
    LEFT JOIN feedback f ON o.order_id = f.order_id AND oi.item_id = f.item_id
    LEFT JOIN shipper s ON o.shipper_id = s.shipper_id
    WHERE o.order_id = ?
  `
    db.query(sql, [order_id], (err, data) => {
      if (err) {
        reject(err);
      } else {
        const groupedOrders = groupItems(data);
        resolve(groupedOrders);
      }
    });
  });
}

module.exports = { create, getAllOrders, updateStatus, updateShipper, getOrderByOrderId, orderNeedAction, getAllOrdersByUserId };
