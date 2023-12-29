const db = require('../common/connect');


function checkUsernameExists(username) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE username = ?';
      db.query(sql, username, (err, results) => {
        if (err) {
          reject(err);
        } else {
          // If there are any results, the username already exists
          resolve(results.length > 0);
        }
      });
    });
  }
function checkEmailExists(email) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE email = ?';
      db.query(sql, email, (err, results) => {
        if (err) {
          reject(err);
        } else {
          // If there are any results, the email already exists
          resolve(results.length > 0);
        }
      });
    });
  }

function getUserByUsername(username) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT * FROM user WHERE username = ?';
      db.query(sql, username, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
function register(data) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO user SET ?';
      db.query(sql, data, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

function getUserInfo(user_id) {
    return new Promise((resolve, reject) => {
      const sql = 'SELECT u.user_id, u.username, u.fullname, u.email, u.phone, u.address FROM user u WHERE user_id = ?';
      db.query(sql, user_id, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

function updateUserInfo(user_id, data) {
    return new Promise((resolve, reject) => {
        const {fullname, email, phone, address} = data
      const sql = 'UPDATE user SET fullname = ?, email = ?, phone = ?, address = ? WHERE user_id = ?';
      db.query(sql, [fullname, email, phone, address, user_id], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

module.exports = {checkUsernameExists, checkEmailExists,getUserByUsername, getUserInfo, updateUserInfo, register}