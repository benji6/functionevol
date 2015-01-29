var identity = (x) => x;
var negate = (x) => -x;
var sin = (x) => Math.sin(x);
var cos = (x) => Math.cos(x);

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
