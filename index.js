var express = require('express'),
	http = require('http'),
    bodyParser = require('body-parser'),
    fs = require('fs'),
    morgan = require('morgan'),
    ejs = require('ejs'),
    engine = require('ejs-mate');
var port = process.env.PORT || 5000;
var mongoose = require('mongoose');
var app = express();

app.engine('ejs', engine);
app.set('port', port);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/public', express.static(__dirname + '/public'));


mongoose.connect('mongodb://localhost/nodejs-sample-test', function(err){
    if(err){
        console.log('connection error', err);
    }else{
        console.log('connection successful');
    }
});

var ContactUs = require('./models/contact_us');

//Show stack errors
//app.set('showStackError', true);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

app.get('/', function(request, response, next) {
	// TODO per README.md
	console.log('TODO: received a request');
    response.render('index');
});

app.get('/contact-us', function(req, res){
    ContactUs.find(function(err, contactUs){
        if (err)
            res.send(err);
        res.json(contactUs);
    });
});

app.post('/', function(req, res){
    var contactUs = new ContactUs(req.body);
    contactUs.save(function(err){
        if(err){
            return res.status(400).send({
                message: err
            });
        }
        else{
            console.log('I am in');
            res.render('thankyou', {thankyou: 'Thank you. Our team will contact you within next 48hrs'});
        }

    });
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('nodejs-simple-test started at '+ port + ' ' +new Date());
	console.log('please check http://localhost:'+port);
});