var tinytic = require('tinytic');

var applyFitness = require('./lib/applyFitness.js');
var reproduce = require('./lib/reproduction/sexual.js');
var printOutput = require('./lib/printOutput.js');
var Ghost = require('./lib/Ghost/Ghost.js');

var randomElement = function (arr) {
	return arr[Math.floor(Math.random() * (arr.length))];
};

var inputs = (function pushInputs (num, arr) {
	if (!num--) {
		return arr;
	}
	arr.push(num);
	return pushInputs(num, arr);
}(8, []));

var desiredOutputs = (function(inputs) {
	return inputs.map(function(elem) {
		return Math.sin(-(Math.pow(elem, 2) - 1) * 2);
	});
}(inputs));

var duration = 128;
var popSize = duration;

window.population = (function createPopulation (num, arr) {
	if (!num--) {
	 return arr;
	}
	arr.push(Ghost(5, 6));
	//population.push(Ghost(5, 7));
	return createPopulation(num, arr);
}(duration, []));

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
