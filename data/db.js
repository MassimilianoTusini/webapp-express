const mysql = require('mysql2');
require('dotenv').config();

// Creazione connessione al database
const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
});

// Test connessione
connection.connect(err => {

    if (err) throw err;
        
    console.log('Connesso al database MySQL');
});

module.exports = connection;
