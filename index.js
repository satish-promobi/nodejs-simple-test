var express = require('express'),
	http = require('http'),
    bodyParser = require('body-parser');
var port = process.env.PORT || 5000;
var mongoose = require('mongoose');
var app = express();
//var router = express.Router();

mongoose.connect('mongodb://localhost/nodejs-sample-test');

var ContactUs = require('./models/contact_us');

app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//connect flash for flash messages
//app.use(flash());
app.get('/', function(request, response) {
	// TODO per README.md
	console.log('TODO: received a request');
	response.render('index');
});

app.post('/', function(req, res){
    var contactUs = new ContactUs(req.body);
    contactUs.save(function(err){
        if(err){
            return res.status(400).send({
                message: err
            });
        } else{
            req.body = {};
            res.render('index');
        }
    });
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('nodejs-simple-test started at '+ port + ' ' +new Date());
	console.log('please check http://localhost:'+port);
});