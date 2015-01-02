//time app
var tinytic = require('tinytic');
var startTime = tinytic.toc();
var timeElapsed = 0;

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
		return Math.sin(-(Math.pow(elem, 2) - 1) * 2);
	});
};
var desiredOutputs = desiredFunction(inputs);
var popSize = 512;
var num = popSize;
var duration = 512;
var iterationCount = 0;
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
while (timeElapsed < duration) {
	iterationCount++;
	newGeneration();
	timeElapsed += tinytic.toc();
}
printOutput(population, inputs, desiredOutputs, timeElapsed, iterationCount);
