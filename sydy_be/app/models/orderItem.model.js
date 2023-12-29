const db = require('../common/connect');

function create(orderItemData) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO order_item SET ?';
      db.query(sql, orderItemData, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  module.exports = { create };