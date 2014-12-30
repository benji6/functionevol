var flip = require('../flip.js');

var add = function (x, y) {
	return x + y;
};
var subtract = function (x, y) {
	return x - y;
};
var multiply = function (x, y) {
	return x * y;
};
var divide = function (x, y) {
	return x / y;
};
var pow = function (x, y) {
	return Math.pow(x, y);
};
module.exports = [
	add,
	subtract,
	flip(subtract),
	multiply,
	flip(multiply),
	pow,
	flip(pow)
];
