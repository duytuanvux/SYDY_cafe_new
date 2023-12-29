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
module.exports = {getCategory};