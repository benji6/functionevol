var composeFunctionChain = require('./composeFunctionChain.js');

module.exports = function (population, input, desiredOutput) {
	var num = population.length;
	var funChain;
	var composedRes;
	while (num--) {
		res = composeFunctionChain(population[num]);
		console.log('length: ' + res.funChain.length);
		console.log(res.funChain.toString());
		composedRes = res.composed(input);
		console.log('output: ' + composedRes);
		console.log('accuracry: ' +
			(1 - Math.abs(composedRes - desiredOutput)));
		console.log('/////////////////////');
	}
	console.log('input was: ' + input);
	console.log('desired output: ' + desiredOutput);
};
