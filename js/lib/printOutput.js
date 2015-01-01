var compose = require('./compose.js');

module.exports = function (population, inputs, desiredOutputs) {
	var num = population.length;
	var funChain;
	var composedRes;
	var element;
	while (num--) {
		element = population[num];
		console.log('length: ' + element.funs.length);
		console.log(element.funs.toString());
		composedRes = compose(element.funs)(inputs[0]);
		console.log('output: ' + composedRes);
		console.log('accuracry: ' + element.accuracy);
		console.log('/////////////////////');
	}
	console.log('input was: ' + inputs);
	console.log('desired output: ' + desiredOutputs);
};
