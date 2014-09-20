var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded());

require('./routes/router.js');


app.listen(80);
