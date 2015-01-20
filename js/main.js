var tinytic = require('tinytic');

var applyFitness = require('./lib/applyFitness.js');
var reproduce = require('./lib/reproduction/sexual.js');
var printOutput = require('./lib/printOutput.js');
var Ghost = require('./lib/Ghost.js');

var randomElement = function (arr) {
	return arr[Math.floor(Math.random() * (arr.length))];
};

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
var duration = 128;
var popSize = duration;
var secondArgument = Math.random();
var iterationCount = 0;
var population = [];

(function createPopulation (num) {
	if (num--) {
		population[num] = new Ghost({
			arity: 1,
			length: 8
		});
		createPopulation(num);
	}
}(popSize));

var survivors = population.slice(0);

(function newGeneration () {
	iterationCount++;
	var child;

	while (population.length < popSize) {
		child = reproduce(randomElement(survivors), randomElement(survivors));
		population.push(child);
	}

	survivors = applyFitness(population, inputs, desiredOutputs);
	if (tinytic.total() < duration) {
		newGeneration();
	}
}());

printOutput(population, inputs, desiredOutputs, duration, iterationCount);
