var compose = require('./compose.js');

module.exports = function(obj) {
	var funChain = obj.funs;
	var composed = compose(funChain);
	return {
		funChain: funChain,
		composed: composed
	};
};
