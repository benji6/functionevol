var compose = require('./compose.js');

var computeOutput = function(obj, inputs) {
	var outputs = [];
	var i;
	var composed = compose(obj.funs);
	for (i = 0; i < inputs.length; i++) {
		outputs.push(composed(inputs[i]));
	}
	obj.outputs = outputs;
};

var computeAccuracy = function(obj, desiredOutputs) {
	var accuracyDiff = 0;
	var i;
	for (i = 0; i < desiredOutputs.length; i++) {
		accuracyDiff += Math.pow(obj.outputs[i] - desiredOutputs[i], 2);
	}
	obj.accuracy = accuracyDiff;
};

module.exports = function(population, inputs, desiredOutputs) {
	var survivorThreshold = (population.length / 16).toFixed(0);
	population.forEach(function(el) {
		computeOutput(el, inputs);
		computeAccuracy(el, desiredOutputs);
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
