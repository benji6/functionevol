var flip = function(fn) {
	return function(x, y) {
		return fn(y, x);
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

module.exports = {
	names: [
		'add',
		'subtract',
		'flip(subtract)',
		'multiply',
		'flip(multiply)',
		'pow',
		'flip(pow)'
	],
	fns: [
		add,
		subtract,
		flip(subtract),
		multiply,
		flip(multiply),
		pow,
		flip(pow)
	],
	dominance: [
		0.2,
		0.2,
		0.2,
		0.4,
		0.4,
		0.6,
		0.6
	]
};
