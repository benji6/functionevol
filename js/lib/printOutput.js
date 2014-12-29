var compose = require('./compose.js');

module.exports = function (population, input, desiredOutput) {
	var num = population.length;
	while (num--) {
		console.log('length: ' + population[num].length);
		console.log(population[num].toString());
		var res = compose.apply(null, population[num]);
		console.log('output: ' + res(input));
		console.log('/////////////////////');
	}
	console.log('input was: ' + input);
	console.log('desired output: ' + desiredOutput);
};
