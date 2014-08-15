'use strict';

var http = require('http');
var mod_form = require('./form.js');
var mail = require('./mail.js');
var response = require('./response.js');

var host = null;
var port = 8001;

var req2email = function (req) {
	var email;

	if (req.headers.host.match(/amberbio/) && req.url === '/mailSubmission') {
		email = {
			to : 'm@amberbio.com',
			from : 'm@amberbio.com',
			subject : 'Message from Amber\'s web page',
			location : '/mailformconfirmation.html'
		};
	}

	return email;
};

var init = function () {
	http.createServer(function (req, res) {
		var email;

		email = req2email(req);
		if (email) {
			mod_form.parse(req, function (form) {
				var content;

				content = 'Name: ' + form.name + '\nMail: ' + form.mail + '\nMessage: ' + form.message;
				mail.sendmail(email.to, email.from, email.subject, content);

				response['303'](req, res, email.location);
			});
		} else {
			response['404'](req, res);
		}
	}).listen(port, host);

        console.log('mailform server running at ' + host + ':' + port);
};

init();
