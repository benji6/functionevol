momdule.exports = function(fn) {
	return function(x, y) {
		if (arguments.length === 2) {
			return fn.call(this, y, x);
		}
		return function(y) {
			return fn.call(this, y, x);
		};
	};
};
