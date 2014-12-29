var compose = require('./compose.js');

module.exports = function(population, input, desiredOutput, survivors) {
	population.sort(function (a, b) {
		return Math.abs(compose.apply(null, a)(input) - desiredOutput) -
			Math.abs(compose.apply(null, b)(input) - desiredOutput);
	});
	population.splice(survivors);
};
