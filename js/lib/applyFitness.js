var compose = require('./compose.js');

module.exports = function(population, input, desiredOutput) {
	var survivorThreshold = (population.length * .1).toFixed(0);
	population.sort(function (a, b) {
		return Math.abs(compose.apply(null, a)(input) - desiredOutput) -
			Math.abs(compose.apply(null, b)(input) - desiredOutput);
	});
	return population.splice(survivorThreshold).slice(0);
};
