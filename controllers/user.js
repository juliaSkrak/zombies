var mysql = require('mysql');
exports.update = function(id, long, lat){
var connection = mysql.createConnection({
  host     : '104.131.23.187',
  user     : 'root@HTNzombies',
  password : 'CoolRunnings'
});

connection.connect();
/*
* update a user's location
*/
	var sql = 'REPLACE INTO users values (' + id + ', '+ long +',' + lat + ')' ;
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
  host     : '104.131.23.187',
  user     : 'root@HTNzombies',
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
  host     : '104.131.23.187',
  user     : 'root@HTNzombies',
  password : 'CoolRunnings'
});
connection.connect();
	var sql    = 'SELECT * FROM users WHERE long = ' + connection.escape(long);
	connection.query(sql, function(err, results) {
	if(err)	{
  		throw err;
  	}else{
  		console.log(results);
  	}
  });
connection.end();
}