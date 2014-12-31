module.exports = function(fns) {
	return function (x) {
		var i;
		for (i = 0; i < fns.length; i++) {
			x = fns[i].call(this, x);
		}
		return x;
	};
};
