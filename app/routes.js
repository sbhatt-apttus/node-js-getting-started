module.exports = function(app) {

	// server routes ===========================================================
	// handle things like api calls
	// authentication routes
	app.use(function(req, res, next) {
	  next();
	});
	app.get('/', function(req, res) {
		//res.sendfile('./public/index.html');
		res.send('API Loads here');
	});

	/*Client*/
	var client = require('./middleware/client');
	app.get('/api/clients', client.getAllClients);
	app.get('/api/getXML', client.getJSONTOXML);

	
};