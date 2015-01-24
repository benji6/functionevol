var tinytic = require('tinytic');

var applyFitness = require('./lib/applyFitness.js');
var reproduce = require('./lib/reproduction/sexual.js');
var printOutput = require('./lib/printOutput.js');
var Ghost = require('./lib/Ghost/Ghost.js');

var randomElement = function (arr) {
	return arr[Math.floor(Math.random() * (arr.length))];
};

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
window.population = [];

(function createPopulation (num) {
	if (!num--) {
	 return;
	}
	population.push(Ghost(4, 8));
	createPopulation(num);
}(popSize));

var survivors = population.slice(0);

var repopulate = function repopulate () {
	if (population.length >= popSize) {
		return;
	}
	var child = reproduce(randomElement(survivors), randomElement(survivors));
	population.push(child);
	repopulate();
};

var iterationCount = (function newGeneration (iterationCount) {
	repopulate();
	survivors = applyFitness(population, inputs, desiredOutputs);

	if (tinytic.total() < duration) {
		return newGeneration(++iterationCount);
	}

	return iterationCount;
}(0));

printOutput(population, inputs, desiredOutputs, duration, iterationCount);
