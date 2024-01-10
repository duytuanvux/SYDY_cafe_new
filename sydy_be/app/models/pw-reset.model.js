const db = require('../common/connect');

function storeResetToken(userId, resetToken, expirationTime) {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO password_reset (user_id, reset_token, reset_token_expiration) VALUES (?, ?, ?)'
        db.query(sql,[userId, resetToken, expirationTime], (err,data) => {
            if (err) {
                reject(err);
              } else {
                resolve(data);
              }
        })
    })
}

function getResetInfoByToken(token) {
    return new Promise((resolve, reject) => {
        const sql = 'SELECT * FROM password_reset WHERE reset_token = ?'
        db.query(sql,[token], (err,data) => {
            if (err) {
                reject(err);
              } else {
                resolve(data);
              }
        })
    })
}

function deleteResetInfoByUserId(userId) {
    return new Promise((resolve, reject) => {
        const sql = 'DELETE FROM password_reset WHERE user_id = ?'
        db.query(sql,[userId], (err,data) => {
            if (err) {
                reject(err);
              } else {
                resolve(data);
              }
        })
    })
}

module.exports = {
    storeResetToken,
    getResetInfoByToken,
    deleteResetInfoByUserId,
};
