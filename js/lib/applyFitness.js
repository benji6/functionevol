var compose = require('./compose.js');

module.exports = function(population, input, desiredOutput) {
	var survivorThreshold = (population.length * .1).toFixed(0);
	population.sort(function (a, b) {
		return Math.abs(compose.apply(null, a.map(function(e) {
			return e.fun;
		}))(input) - desiredOutput) -
			Math.abs(compose.apply(null, b.map(function(e) {
			return e.fun;
		}))(input) - desiredOutput);
	});
	return population.splice(survivorThreshold).slice(0);
};
