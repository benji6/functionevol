module.exports = function() {
	var fns = arguments;
	return function (x) {
		var num = fns.length;
		while (num--) {
			x = fns[num].call(this, x);
		}
		return x;
	};
};
