const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));
hbs.registerPartials(__dirname + '/views/partials/');
hbs.registerHelper('getCurrentYear', () => {
	return new Date().getFullYear()
});

app.use((req, res, next) => {
	var now = new Date().toString();
	
	var log = `${now}: method: ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	});
	next();
});

app.use((req, res, next) => {
	
	res.render('maintenance.hbs');

});

hbs.registerHelper('screamIt', (text) => {
	return text.toUpperCase()
});

//let's us set up a handler, address, and what to give back
//request stores header... method... etc
//respond customize what you send back 

app.get('/', (req, res) => {
	res.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to this page!'
	});
});

app.get('/about', (req, res) => {
	res.render('about.hbs', {
		pageTitle: 'About Page'
	});
});

app.get('/bad', (req, res) => {
	res.send({
		errorMessage: 'Bad link',
		errorMessage_1: 'Bad link'
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});