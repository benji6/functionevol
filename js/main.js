//time app
var tinytic = require('tinytic');
tinytic.toc();

var compose = require('./lib/compose.js');
var unaryBaseFunctions = require('./lib/baseFunctions/unaryBaseFunctions.js');
var binaryBaseFunctions = require('./lib/baseFunctions/binaryBaseFunctions.js');
var randomIndex = require('./lib/randomIndex.js');
var randomElement = require('./lib/randomElement.js');
var applyFitness = require('./lib/applyFitness.js');
var reproduce = require('./lib/reproduce.js');
var printOutput = require('./lib/printOutput.js');


//Initial Population
var i;
var inputs = [];
for (i = 0; i < 32; i++) {
	inputs.push(i);
}
var desiredFunction = function(inputs) {
	return inputs.map(function(elem) {
		return Math.sin(-(Math.pow(elem, 2) - 2) * 2);
	});
};
var desiredOutputs = desiredFunction(inputs);
var popSize = 768;
var generations = popSize;
var num = popSize;
var population = [];
var randomIndexUnary = randomIndex(unaryBaseFunctions.funs.length);
while (num--) {
	population[num] = {
		accuracy: 0,
		//dev - first function possibly a binary for dual input
		libs: [
			//'binaryBaseFunctions',
			'unaryBaseFunctions'
		],
		names: [
			unaryBaseFunctions.names[randomIndexUnary]
		],
		funs: [
			//randomElement(binaryBaseFunctions),
			unaryBaseFunctions.funs[randomIndexUnary]
		]
	};
}
var survivors = population.slice(0);
var newGeneration = function () {
	var child;

	while (population.length < popSize) {
		child = reproduce(randomElement(survivors), randomElement(survivors));
		population.push(child);
	}

	survivors = applyFitness(population, inputs, desiredOutputs);
};
while (generations--) {
	newGeneration();
}
printOutput(population, inputs, desiredOutputs, tinytic.toc());
