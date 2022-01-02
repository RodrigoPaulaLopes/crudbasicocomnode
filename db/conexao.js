const mysql = require('mysql')

const pool = mysql.createPool({
    connectionLimit: 10,
    host: "localhost",
    user: "root",
    password: "root",
    database: "user"
})

module.exports = pool