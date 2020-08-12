const mysql = require('mysql');
const { promisify } = require('util');

const config = {
    host: '178.128.146.252',
    port: '3306',
    database: 'admin_sigmatest',
    user: 'admin_sigmauser',
    password: 'pfaDKIJyPF'
}

const database = mysql.createPool(config);

// Error handlers
database.getConnection((err, connection) => {
  if (err) {
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      console.error('Database connection was closed.');
    }
    if (err.code === 'ER_CON_COUNT_ERROR') {
      console.error('Database has to many connections');
    }
    if (err.code === 'ECONNREFUSED') {
      console.error('Database connection was refused');
    }
  }

  if (connection) connection.release();
  console.log('DB is Connected');
});

database.query = promisify(database.query);
module.exports = database;