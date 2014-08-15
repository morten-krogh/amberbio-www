'use strict';

var buffer = require('./buffer.js');

var decode_name_value = function (value) {
	try {
		return decodeURIComponent(value.replace(/\+/g, ' '));
	} catch (exception) {
		return unescape(value.replace(/\+/g, ' '));
	}
};

var urlencoded = function (body) {
	var form, name_value_pairs, i, name_value_pair;

	form = {};
	name_value_pairs = body.toString().split('&');
	for (i = 0; i < name_value_pairs.length; i++) {
		name_value_pair = name_value_pairs[i].split('=');
		if (name_value_pair.length === 2) {
			form[decode_name_value(name_value_pair[0])] = decode_name_value(name_value_pair[1]);
		}
	}

	return form;
};

var multipart = function (req, body) {
	var form;

	//console.log(req.headers);
	//console.log(body);

	return form;
};

exports.parse = function (req, callback) {
	buffer.read_stream_to_buffer(req, function (body) {
		var form;

		if ('content-type' in req.headers && req.headers['content-type'].match('application/x-www-form-urlencoded')) {
			form = urlencoded(body);
		} else if ('content-type' in req.headers && req.headers['content-type'] === 'multipart/form-data') {
			form = multipart(req, body);
		} else {
			try {
				form = JSON.parse(body);
			} catch (err) {
				form = null;
			}
		}
		callback(form);
	});
};
