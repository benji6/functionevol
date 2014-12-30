var composeFunctionChain = require('./composeFunctionChain.js');

module.exports = function(population, input, desiredOutput) {
	var survivorThreshold = (population.length * .1).toFixed(0);
	population.sort(function (a, b) {
		var resA = composeFunctionChain(a);
		var resB = composeFunctionChain(b);
		var accuracyDiff = Math.abs(resA.composed(input) - desiredOutput) -
			Math.abs(resB.composed(input) - desiredOutput);
		if (accuracyDiff === 0) {
			return resA.funChain.length - resB.funChain.length;
		}
		return accuracyDiff;
	});
	return population.splice(survivorThreshold).slice(0);
};
