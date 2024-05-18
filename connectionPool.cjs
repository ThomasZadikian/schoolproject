const mysql = require('mysql2/promise'); 

const pool = {
    host: '127.0.0.1', 
    user: 'admin', 
    password: 'admin',
    database: 'portforall', 
    waitForConnections: true,
    queueLimit: 0
  };

  const connection = mysql.createPool(pool); 

  module.exports = connection; 