var compose = require('./compose.js');

var computeAccuracy = function(obj, inputs, desiredOutputs) {
	var accuracyDiff = 0;
	for (i = 0; i < inputs.length; i++) {
		accuracyDiff += Math.abs(compose(obj.funs)(inputs[i]) - desiredOutputs[i]);
	}
	obj.accuracy = accuracyDiff;
};

module.exports = function(population, input, desiredOutput) {
	var survivorThreshold = (population.length / 16).toFixed(0);
	population.forEach(function(el) {
		computeAccuracy(el, input, desiredOutput);
	});
	population.sort(function (a, b) {
		var accuracyDiff = a.accuracy - b.accuracy;
		if (accuracyDiff === 0) {
			return a.funs.length - b.funs.length;
		}
		return accuracyDiff;
	});
	return population.splice(survivorThreshold).slice(0);
};
