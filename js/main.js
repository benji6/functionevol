var tinytic = require('tinytic');

var randomElement = require('./lib/randomElement.js');
var applyFitness = require('./lib/applyFitness.js');
var reproduce = require('./lib/reproduction/randomUnaryAdding.js');
var printOutput = require('./lib/printOutput.js');
var Ghost = require('./lib/Ghost.js');

//Initial Population
var i;
var inputs = [];
for (i = 0; i < 8; i++) {
	inputs.push(i);
}
var desiredFunction = function(inputs) {
	return inputs.map(function(elem) {
		return Math.sin(-(Math.pow(elem, 2) - 1) * 2);
	});
};
var desiredOutputs = desiredFunction(inputs);
var duration = 512;
var popSize = duration;
var num = popSize;
var secondArgument = Math.random();
var iterationCount = 0;
var population = [];

while (num--) {
	population[num] = new Ghost();
}
var survivors = population.slice(0);
var newGeneration = function () {
	var child;

	while (population.length < popSize) {
		child = reproduce(randomElement(survivors), randomElement(survivors));
		population.push(child);
	}

	survivors = applyFitness(population, inputs, desiredOutputs, secondArgument);
};
while (tinytic.total() < duration) {
	iterationCount++;
	newGeneration();
}
printOutput(population, inputs, desiredOutputs, duration, iterationCount);
