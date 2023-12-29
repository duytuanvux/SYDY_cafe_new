const db = require('../common/connect');


function addFeedback(feedbackData) {
    return new Promise((resolve, reject) => {
      const sql = 'INSERT INTO feedback SET ?';
      db.query(sql, feedbackData, (err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result.insertId);
        }
      });
    });
  }
  function getFeedbackForItem(item_id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM feedback WHERE item_id = ?';
      db.query(sql, item_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  module.exports = { addFeedback ,getFeedbackForItem};