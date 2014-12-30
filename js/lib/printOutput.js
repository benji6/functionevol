var compose = require('./compose.js');

module.exports = function (population, input, desiredOutput) {
	var num = population.length;
	var funChain;
	while (num--) {
		funChain = population[num].map(function(e) {
			return e.fun;
		});
		console.log('length: ' + funChain.length);
		console.log(funChain.toString());
		var res = compose.apply(null, funChain);
		console.log('output: ' + res(input));
		console.log('/////////////////////');
	}
	console.log('input was: ' + input);
	console.log('desired output: ' + desiredOutput);
};
