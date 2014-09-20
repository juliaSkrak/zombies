var mysql = require('mysql');
exports.update = function(id, longitude, latitude){
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'CoolRunnings',
  database: 'nodejs'
});

connection.connect();
/*
* update a user's location
*/
	var sql = 'REPLACE INTO users values (' + id + ', '+ longitude +',' + latitude + ')' ;
	connection.query(sql, function(err, results) {
	if(err)	{
  		throw err;
  	}else{
  		console.log( results);
  	}
  });
connection.end();
};

/*
* finds a user's location
*/
exports.findId = function(id){
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'CoolRunnings'
});
connection.connect();
	var sql    = 'SELECT * FROM users WHERE id = ' + connection.escape(id);
	connection.query(sql, function(err, results) {
	if(err)	{
  		throw err;
  	}else{
  		console.log( results);
  	}
  });
connection.end();
}


exports.findLong = function(long){
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'CoolRunnings'
});
connection.connect();
	var sql    = 'SELECT * FROM users WHERE longitude = ' + connection.escape(long);
	connection.query(sql, function(err, results) {
	if(err)	{
  		throw err;
  	}else{
  		console.log(results);
  	}
  });
connection.end();
}
