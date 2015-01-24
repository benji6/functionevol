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

var names = [
	"identity",
	"negate",
	"sin",
	"cos"
];

var fns = [
	identity,
	negate,
	sin,
	cos
];
var dominances = [
	0.2,
	0.4,
	0.6,
	0.8
];

module.exports = {
	names,
	fns,
	dominances
};
