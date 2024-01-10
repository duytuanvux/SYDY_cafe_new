const db = require('../common/connect');

function getCategory() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM category';
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
function getShipper() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM shipper s WHERE s.isActive = 1';
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
function addShipper(shipperData) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO shipper SET ?';
      db.query(sql, shipperData, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
}
function updateShipper(shipperId, updatedShipperData) {
  return new Promise((resolve, reject) => {
    // Assuming you have a unique identifier for the shipper (shipperId)
    const sql = 'UPDATE shipper SET ? WHERE shipper_id = ?';

    // Execute the SQL query using db.query
    db.query(sql, [updatedShipperData, shipperId], (err, result) => {
      if (err) {
        // If there is an error, reject the promise with the error
        reject(err);
      } else {
        // If successful, resolve the promise with the query result
        resolve(result);
      }
    });
  });
}
function deleteShipper(shipperId) {
  return new Promise((resolve, reject) => {
    // Assuming you have a unique identifier for the shipper (shipperId)
    const sql = 'UPDATE shipper SET isActive = 0 WHERE shipper_id = ?';

    db.query(sql, [shipperId], (err, result) => {
      if (err) {
        // If there is an error, reject the promise with the error
        reject(err);
      } else {
        // If successful, resolve the promise with the query result
        resolve(result);
      }
    });
  });
}


function getStatus() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM order_status';
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }
function getPaymentMethod() {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM payment_method';
      db.query(sql, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  }



module.exports = {getCategory,getShipper, addShipper, updateShipper, deleteShipper, getStatus, getPaymentMethod};