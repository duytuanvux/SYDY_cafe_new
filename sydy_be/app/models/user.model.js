const db = require("../common/connect");

function checkUsernameExists(username) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user WHERE username = ?";
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
    const sql = "SELECT * FROM user WHERE email = ?";
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
    const sql = "SELECT * FROM user WHERE username = ?";
    db.query(sql, username, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
function getUserInfoByEmail(email) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT * FROM user WHERE email = ?";
    db.query(sql, [email], (err, data) => {
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
    const sql = "INSERT INTO user SET ?";
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
    const sql =
      "SELECT u.user_id, u.username, u.fullname, u.email, u.phone, u.address, u.isActive FROM user u WHERE user_id = ?";
    db.query(sql, [user_id], (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
function getUserPW(user_id) {
  return new Promise((resolve, reject) => {
    const sql = "SELECT u.password FROM user u WHERE user_id = ?";
    db.query(sql, [user_id], (err, data) => {
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
    const { fullname, email, phone, address } = data;
    const sql =
      "UPDATE user SET fullname = ?, email = ?, phone = ?, address = ? WHERE user_id = ?";
    db.query(sql, [fullname, email, phone, address, user_id], (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

function getAllUser() {
  return new Promise((resolve, reject) => {
    const sql =
      "SELECT u.user_id, u.username, u.fullname, u.email, u.phone, u.address, u.isActive FROM user u ";
    db.query(sql, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
function deactivateUser(user_id) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE user SET isActive = false WHERE user_id = ?";
    db.query(sql, [user_id], (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
function activateUser(user_id) {
  return new Promise((resolve, reject) => {
    const sql = "UPDATE user SET isActive = true WHERE user_id = ?";
    db.query(sql, [user_id], (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}
function updatePassword(user_id, hashedPassword) {
  return new Promise(async (resolve, reject) => {
    try {
      // Hash the new password before updating it in the database
      const sql = "UPDATE user SET password = ? WHERE user_id = ?";
      db.query(sql, [hashedPassword, user_id], (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    } catch (error) {
      reject(error);
    }
  });
}

module.exports = {
  checkUsernameExists,
  checkEmailExists,
  getUserByUsername,
  getUserInfo,
  getAllUser,
  updateUserInfo,
  register,
  deactivateUser,
  getUserInfoByEmail,
  updatePassword,
  getUserPW,
  activateUser,
  deactivateUser,
};
