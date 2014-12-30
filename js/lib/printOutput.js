var compose = require('./compose.js');

module.exports = function (population, input, desiredOutput) {
	var num = population.length;
	var funChain;
	var composedRes;
	var element;
	while (num--) {
		element = population[num];
		console.log('length: ' + element.funs.length);
		console.log(element.funs.toString());
		composedRes = compose(element.funs)(input);
		console.log('output: ' + composedRes);
		console.log('accuracry: ' +
			(1 - Math.abs(composedRes - desiredOutput)));
		console.log('/////////////////////');
	}
	console.log('input was: ' + input);
	console.log('desired output: ' + desiredOutput);
};
