const mysql = require('mysql');
const pool = mysql.createPool({
	connectionLimit: 10,
	host: 'mysql',
	user: 'root',
	password: 'choi',
	database: 'myapp',
});

exports.pool = pool;