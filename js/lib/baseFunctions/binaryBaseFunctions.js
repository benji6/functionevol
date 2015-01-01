var flip = require('../flip.js');

var binaryDecorator = function(fn) {
	//hack
	return function(arr) {
		return fn(arr, 1);
	};
};

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
binaryBaseFunctions = [
	add,
	subtract,
	flip(subtract),
	multiply,
	flip(multiply),
	pow,
	flip(pow)
];
module.exports = binaryBaseFunctions.map(function(elem) {
	return binaryDecorator(elem);
});
