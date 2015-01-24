var chain = require('./chain.js');

var computeOutput = function(ghost, inputs) {
	var outputs = [];
	var i;
	var chained = chain(ghost.fns);
	inputs.forEach(function (element) {
		outputs.push(chained(element)(ghost.args[0]));
	});
	ghost.outputs = outputs;
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
		el.computeFns();
		computeOutput(el, inputs);
		computeAccuracy(el, desiredOutputs);
	});
	population.sort(function (a, b) {
		var accuracyDiff = a.accuracy - b.accuracy;
		if (accuracyDiff === 0) {
			return a.fns.length - b.fns.length;
		}
		return accuracyDiff;
	});
	return population.splice(survivorThreshold);
};
