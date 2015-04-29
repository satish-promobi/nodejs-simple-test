var express = require('express'),
	http = require('http');
var port = process.env.PORT || 5000;
var app = express();

app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	// TODO per README.md
	console.log('TODO: received a request');
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('nodejs-simple-test started at ' +new Date());
});