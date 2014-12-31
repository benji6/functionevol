var compose = require('./compose.js');

module.exports = function(population, input, desiredOutput) {
	var survivorThreshold = (population.length * .1).toFixed(0);
	population.sort(function (a, b) {
		var accuracyDiff = 0;
		var i;
		for (i = 0; i < input.length; i++) {
			accuracyDiff += Math.abs(compose(a.funs)(input[i]) - desiredOutput[i]) -
				Math.abs(compose(b.funs)(input[i]) - desiredOutput[i]);
			if (accuracyDiff === 0) {
				return a.funs.length - b.funs.length;
			}
		}
		return accuracyDiff;
	});
	return population.splice(survivorThreshold).slice(0);
};
