var composeFunctionChain = require('./composeFunctionChain.js');

module.exports = function(population, input, desiredOutput) {
	var survivorThreshold = (population.length * .1).toFixed(0);
	population.sort(function (a, b) {
		return Math.abs(composeFunctionChain(a).composed(input) - desiredOutput) -
			Math.abs(composeFunctionChain(b).composed(input) - desiredOutput);
	});
	return population.splice(survivorThreshold).slice(0);
};
