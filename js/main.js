//time app
var tinytic = require('tinytic');
tinytic.toc();

var compose = require('./lib/compose.js');
var baseFunctions = require('./lib/baseFunctions/unaryBaseFunctions.js');
var randomIndex = require('./lib/randomIndex.js');
var randomElement = require('./lib/randomElement.js');
var applyFitness = require('./lib/applyFitness.js');
var breed = require('./lib/breed.js');
var printOutput = require('./lib/printOutput.js');


//Initial Population
var inputs = [1, 2, 3, 4];
var desiredFunction = function(inputs) {
	return inputs.map(function(elem) {
		return elem * 2;
	});
};
var desiredOutputs = desiredFunction(inputs);
var popSize = 128;
var generations = popSize;
var num = popSize;
var population = [];
while (num--) {
	population[num] = {
		accuracy: 0,
		//dev - first function possibly a binary for dual input
		libs: [
			'none',
			'unaryBaseFunctions'
		],
		funs: [
			function(x) {
				return x * 2 + 2;
			},
			randomElement(baseFunctions)
		]
	};
}
var survivors = population.slice(0);
var newGeneration = function () {
	var child;

	while (population.length < popSize) {
		child = breed(randomElement(survivors), randomElement(survivors));
		population.push(child);
	}

	survivors = applyFitness(population, inputs, desiredOutputs);
};
while (generations--) {
	newGeneration();
}
printOutput(population, inputs, desiredOutputs, tinytic.toc());
