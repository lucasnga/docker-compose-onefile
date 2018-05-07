const express = require('express');
const mysql = require('mysql');
const config = require('./config');

const connection = mysql.createConnection({
	host: config.databaseHost,
	user: config.databaseUser,
	password: config.databasePassword
});

connection.query(`USE ${ config.databaseName }`, err => {
	if (err) {
		console.log(err.sqlMessage);
	} else {
		console.log('selected database', `USE ${ config.databaseName }`);
	}
});

const app = express();

app.get('/', (req, res) => {
	console.log('get /');
	connection.query('SELECT * FROM todos', (err, rows) => {
		if (!err) {
			res.status(200).send({ todos: rows });
		} else {
			console.log(err.sqlMessage);
			res.status(204).send(err.sqlMessage);
		}
	});
});

app.listen(3000, () => console.log('App listening on port 3000!'));
