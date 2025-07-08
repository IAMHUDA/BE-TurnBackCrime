const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '', // isi sesuai password MySQL kamu
    database: 'turnbackcrime'
});

connection.connect((err) => {
    if (err) throw err;
    console.log('Database connected.');
});

module.exports = connection;
