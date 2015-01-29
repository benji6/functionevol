var chain = require('./chain.js');
var computeFns = require('./Ghost/computeFns.js');

var computeOutput = function(ghost, inputs) {
	var outputs = [];
	var chained = chain(computeFns(ghost));
	inputs.forEach((element) => {
		outputs.push(ghost.args.reduce(function (acc, current) {
			return acc(current);
		}, chained(element)));
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
		computeOutput(el, inputs);
		computeAccuracy(el, desiredOutputs);
	});
	population.sort(function (a, b) {
		if (isNaN(a.accuracy)) {
			return Infinity;
		}
		var accuracyDiff = a.accuracy - b.accuracy;
		if (accuracyDiff === 0) {
			return a.fns.length - b.fns.length;
		}
		return accuracyDiff;
	});
	return population.splice(survivorThreshold);
};
