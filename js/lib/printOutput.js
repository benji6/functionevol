var compose = require('./compose.js');

module.exports = function (population, inputs, desiredOutputs, timeElapsed) {
	var num = population.length;
	var funChain;
	var composedRes;
	population.forEach(function(elem) {
		console.log(elem.names.toString());
		console.log('length: ' + elem.funs.length);
		console.log('inputs: ' + inputs);
		console.log('outputs: ' + elem.outputs);
		console.log('desired outputs: ' + desiredOutputs);
		console.log(
			'accuracy: ' +
			elem.accuracy +
			' (0 is optimal, greater number correlates to greater inaccuracy)'
		);
		console.log('/////////////////////');
	});

	console.log('time elapsed: ' + timeElapsed + 'ms');
};
