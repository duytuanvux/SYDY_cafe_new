const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: 'root',
    password: process.env.DB_PASSWORD,
    database: 'sydy_cafe'
  });

connection.connect((error) => {
    if (error) {
      console.error('Connection to the database failed:', error.message);
    } else {
      console.log('Connected to the database');
    }
  });

module.exports = connection