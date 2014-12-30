var compose = require('./compose.js');

module.exports = function(arr) {
	var funChain = arr.map(function(e) {
		return e.fun;
	});
	var composed = compose(funChain);
	return {
		funChain: funChain,
		composed: composed
	};
};
