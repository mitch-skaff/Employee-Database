const mysql = require('mysql2');
const util = require('util');

const connection = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username/password,
        user: 'root',
        password: 'rootroot',
        database: 'employees_db'
    },
    console.log(`Connected to the employees_db database.`)
);

connection.connect();

connection.query = util.promisify(connection.query);

module.exports = connection;