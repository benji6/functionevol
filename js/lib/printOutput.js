var composeFunctionChain = require('./composeFunctionChain.js');

module.exports = function (population, input, desiredOutput) {
	var num = population.length;
	var funChain;
	while (num--) {
		res = composeFunctionChain(population[num]);
		console.log('length: ' + res.funChain.length);
		console.log(res.funChain.toString());
		console.log('output: ' + res.composed(input));
		console.log('/////////////////////');
	}
	console.log('input was: ' + input);
	console.log('desired output: ' + desiredOutput);
};
