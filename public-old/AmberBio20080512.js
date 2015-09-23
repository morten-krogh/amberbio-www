'use strict';

var ending = '@amberbio.com';
var m = 'mailto:';

function write_anchor(name) {
	var total;

	total = name + ending;
	document.write('<a href=\'' + m + total + '\'>' + total + '</a>');
}

function general() {
	write_anchor('in' + 'fo');
}

function mk() {
	write_anchor('mort' + 'en.kro' + 'gh');
}

function aa() {
	write_anchor('ann-s' + 'ofie.a' + 'lbrekt');
}

function po() {
	write_anchor('pet' + 'er.ol' + 'sson');
}
