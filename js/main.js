var compose = require('./lib/compose.js');
var baseFunctions = require('./lib/baseFunctions/unaryBaseFunctions.js');
var randomIndex = require('./lib/randomIndex.js');
var randomElement = require('./lib/randomElement.js');
var applyFitness = require('./lib/applyFitness.js');
var breed = require('./lib/breed.js');
var printOutput = require('./lib/printOutput.js');

//Initial Population
var input = Math.random();
var desiredOutput = Math.PI * 5;
var popSize = 256;
var generations = 64;
var num = popSize;
var population = [];
while (num--) {
	population[num] = [randomElement(baseFunctions), randomElement(baseFunctions)];
}
var survivors = population.slice(0);
var newGeneration = function () {
	var child;

	while (population.length < popSize) {
		child = breed(randomElement(survivors), randomElement(survivors));
		population.push(child);
	}

	survivors = applyFitness(population, input, desiredOutput);
};

while (generations--) {
	newGeneration();
}

printOutput(population, input, desiredOutput);

//development - apply preferential treatment for more optimised functions where outputs are the same
