var mysql = require('mysql');

/*
	connection.connect();
	connection.end();
	hostName = 'localhost', userName = 'root', passName = 'tubokarto1904', dbName = 'nodejs', mysql
*/

exports.connect = function() {
	return connection = mysql.createConnection({
	  host     	: 'localhost',
	  user     	: 'root',
	  password 	: 'tubokarto1904',
	  database 	: 'nodejs',
	  port		: 3306,
	});
};

/*disconnect = function(dbConnection){
	dbConnection.end();
}*/