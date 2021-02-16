const mySQL = require("mysql");

const { HOST, DB, DB_USER, DB_PASSWORD } = process.env;


console.log(HOST);
console.log(DB);
console.log(DB_USER);
console.log(DB_PASSWORD);

// koneksi ke db
const db = mySQL.createConnection({
    host: HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    database: DB,
    multipleStatements: true
    // host: 'localhost',
    // user: 'root',
    // password: 'dhiyo007',
    // database: 'new_blanja_db',
    // multipleStatements: true
})

// cek koneksi ke db
db.connect((err) => {
    if (err) throw err;
    console.log('koneksi ke db sukses');
})

module.exports = db;