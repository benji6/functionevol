var chain = require('./chain.js');

var computeOutput = function(obj, inputs) {
	var outputs = [];
	var i;
	var chained = chain(obj.funs);
	for (i = 0; i < inputs.length; i++) {
		outputs.push(chained(inputs[i]));
	}
	obj.outputs = outputs;
};

var computeAccuracy = function(obj, desiredOutputs) {
	var accuracyDiff = 0;
	var i;
	var desiredOutputsLen = desiredOutputs.length;
	for (i = 0; i < desiredOutputs.length; i++) {
		accuracyDiff += Math.abs(obj.outputs[i] - desiredOutputs[i]);
	}
	obj.accuracy = accuracyDiff / desiredOutputsLen;
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
