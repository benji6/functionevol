var compose = require('./compose.js');

var computeAccuracy = function(obj, input, desiredOutput) {
	var accuracyDiff = 0;
	for (i = 0; i < input.length; i++) {
		accuracyDiff += Math.abs(compose(obj.funs)(input[i]) - desiredOutput[i]);
	}
	obj.accuracy = accuracyDiff;
};

module.exports = function(population, input, desiredOutput) {
	var survivorThreshold = (population.length / 16).toFixed(0);
	population.forEach(function(el) {
		computeAccuracy(el, input, desiredOutput);
	});
	population.sort(function (a, b) {
		return a.accuracy - b.accuracy;
	});
	return population.splice(survivorThreshold).slice(0);
};
