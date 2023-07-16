const mysql = require('mysql2');
require('dotenv').config();


// DATABASE connection made

const db = mysql.createConnection(
    {
      host: '127.0.0.1',
      user: 'root',
      password: process.env.DB_PASSWORD,
      database: 'employee_db'
    },
    console.log(`Connected to the employee_db database.`)
  );

  module.exports = db;