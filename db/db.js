const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'asteroidetresmil303',
    database: 'agenciaviajes'
});

connection.connect((err) => {
    if (err) {
        console.error('Error de conexión a  MySQL:' + err.stack);
        return;
    }
    console.log('Conectado a MySQL con el id: ' + connection.threadId);
});

module.exports = connection;