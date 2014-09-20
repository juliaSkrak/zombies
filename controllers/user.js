var mysql = require('mysql');


//find=>>

/*
* finds a user's location
*/
exports.findNear = function(longitude, latitude, callback){
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'CoolRunnings',
  database : 'nodejs'
});
connection.connect();
	var sql    = 'id FROM users WHERE abs(longitude - ' + longitude + ') < 0.001 and abs(latitude - ' + latitude + '< 0.001 and abs(timestampdiff(minute, lastCheckIn, NOW()))<2 and infectTime IS NULL;';
	connection.query(sql, function(err, results) {
	if(err)	{
  		 callback(err);
  	}else{
  		callback(null, results);
  	}
  });
connection.end();
}

/*
* finds where all users were infected
*/
exports.findInfectionPoint = function(callback){
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'CoolRunnings', 
  database : 'nodejs'
});
connection.connect();
  var sql    = 'SELECT longitude, latitude, (infectTime is not NULL) as infected FROM users;';
  connection.query(sql, function(err, results) {
  if(err) {
      callback(err);
    }else{
      callback(null, results);
    }
  });
connection.end();
}

/*
* orders users by kill count 
*/
exports.findTotal = function(callback){
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'CoolRunnings', 
  database : 'nodejs'
});
connection.connect();
  var sql    = 'select id, infectCount, infectTime from users where (infectCount>0) order by infectCount asc;';
  connection.query(sql, function(err, results) {
  if(err) {
      callback(err);
    }else{
      callback(null, results);
    }
  });
connection.end();
}

/*
* orders users by kill count 
*/
exports.killLocations = function(callback){
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'CoolRunnings', 
  database : 'nodejs'
});
connection.connect();
  var sql    = 'select infectLongitude, infectLatitude from users where infectTime < NOW();';
  connection.query(sql, function(err, results) {
  if(err) {
      callback(err);
    }else{
      callback(null, results);
    }
  });
connection.end();
}

/*
* finds if a user is infected
*/
exports.isInfected = function(id, callback){
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'CoolRunnings', 
  database : 'nodejs'
});
connection.connect();
  var sql    = 'SELECT (infectTime IS NOT NULL) as infected FROM users WHERE id="'+ id +'";';
  connection.query(sql, function(err, results) {
  if(err) {
      callback(err);
    }else{
      callback(null, results);
    }
  });
connection.end();

}

/*
* finds if a user is infected
*/
exports.topKillers = function(callback){
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'CoolRunnings', 
  database : 'nodejs'
});
connection.connect();
  var sql    = 'SELECT id, infectCount FROM users WHERE infectCount>0 ORDER BY infectCount DESC;';

  connection.query(sql, function(err, results) {
  if(err) {
       callback(err);
    }else{
      callback(null, results);
    }
  });
connection.end();

}



//updates=>>


/*
* update location
*/
exports.updateLocation = function(id, longitude, latitude, callback){
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'CoolRunnings',
  database : 'nodejs'
});

connection.connect();

  var sql = 'INSERT INTO users (id, longitude, latitude, lastCheckIn) VALUES ("' + id + '", '+ parseFloat(longitude) + ',' + parseFloat(latitude) + ', NOW()) ON DUPLICATE KEY UPDATE longitude=VALUES(longitude), latitude=VALUES(latitude), lastCheckIn=VALUES(lastCheckIn)';
  connection.query(sql, function(err, results) {
  if(err) {
      callback(err);
    }else{
      callback(null, results);
    }
  });
connection.end();
}

/*
* update kill count #killem
*/
exports.updateKill = function(id, callback){
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'CoolRunnings',
  database : 'nodejs'
});

connection.connect();

  var sql = 'UPDATE users SET infectCount=infectCount+1 WHERE id=' + id +' ;';
  connection.query(sql, function(err, results) {
  if(err) {
      callback(err);
    }else{
      callback(null, results);
    }
  });
connection.end();
}


/*
* update to dead
*/
exports.updateZombie = function(id, callback){
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'CoolRunnings',
  database : 'nodejs'
});

connection.connect();

  var sql = 'UPDATE users SET infectLongitude=longitude, infectLatitude=latitude, infectTime=NOW(), infectCount=0 WHERE id='+ id +';';
  connection.query(sql, function(err, results) {
  if(err) {
      callback(err);
    }else{
      callback(null, results);
    }
  });
connection.end();
}
