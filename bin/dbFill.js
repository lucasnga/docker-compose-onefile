/* eslint no-console: "off" */
/* eslint strict: "off" */
const mysql = require('mysql');
const config = require('../src/config');

const connection = mysql.createConnection({
	host: config.databaseHost,
	user: config.databaseUser,
	password: config.databasePassword,
	database: config.databaseName
});

connection.query(
	'CREATE TABLE `todos` (`id` int NOT NULL AUTO_INCREMENT,`todo` varchar(255) NOT NULL, PRIMARY KEY (`id`));',
	(err, status) => {
		if (err) {
			console.log(err.sqlMessage, '| ', err.sql);
		} else {
			console.log('Table Created', status);
		}
	}
);

const todos = [{ todo: 'coffe' }, { todo: 'code' }];
todos.forEach(todo => {
	connection.query('INSERT INTO `todos` SET ?', todo, (err, status) => {
		if (err) {
			console.log(err.sqlMessage, '| ', err.sql);
		} else {
			console.log('Data Created', status);
		}
	});
});

connection.end();
