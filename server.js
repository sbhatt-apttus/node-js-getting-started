// modules =================================================
var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var cors 		   = require('cors');
var vkbeautify        = require('vkbeautify');

var port = process.env.PORT || 8090; // set our port


// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json({limit: '5mb'})); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
//app.use(express.static(__dirname + '/public')); // set the static files location /public/img will be /img for users
app.use(cors());

// routes ==================================================
require('./app/routes')(app); // pass our application into our routes

// start app ===============================================
app.listen(port);	
console.log('Magic happens on port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app