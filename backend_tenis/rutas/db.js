const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
    host: '34.123.0.242', 
    user: 'test130',
    password: '120945',
    database: 'somosuaq'
});

db.connect(error => {
    if (error) {
        console.error('Error al conectar a la base de datos:', error);
    } else {
        console.log('Conexión exitosa a la base de datos');
    }
});

module.exports = db;
