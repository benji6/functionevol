var identity = function(x) {
	return x;
};
var negate = function (x) {
	return -x;
};
var sin = function (x) {
	return Math.sin(x);
};
var cos = function (x) {
	return Math.cos(x);
};

module.exports = {
	names: [
		"identity",
		"negate",
		"sin",
		"cos"
	],
	fns: [
		identity,
		negate,
		sin,
		cos
	],
	dominances: [
		0.2,
		0.4,
		0.6,
		0.8
	]
};
