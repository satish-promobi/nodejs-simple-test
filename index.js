var express = require('express'),
	http = require('http'),
    bodyParser = require('body-parser'),
    morgan = require('morgan');
var port = process.env.PORT || 5000;
var mongoose = require('mongoose');
var app = express();

mongoose.connect('mongodb://localhost/nodejs-sample-test');

var ContactUs = require('./models/contact_us');

app.set('port', port);
app.set('views', __dirname + '/views');
app.use('/public', express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

//Show stack errors
app.set('showStackError', true);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

if(process.env.NODE_ENV==='development'){
    app.use(morgan('dev'));
}

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

            res.render('thankyou', {thankyou: 'Thank you. Our team will contact you within next 48hrs'}, function(err, html){
                res.send(html);
            });
        }
    });
});


app.get('/thankyou', function(req, res){
    res.render('thankyou');
});

http.createServer(app).listen(app.get('port'), function(){
	console.log('nodejs-simple-test started at '+ port + ' ' +new Date());
	console.log('please check http://localhost:'+port);
});