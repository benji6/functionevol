var compose = require('./lib/compose.js');
var baseFunctions = require('./lib/baseFunctions/unaryBaseFunctions.js');
var randomIndex = require('./lib/randomIndex.js');
var applyFitness = require('./lib/applyFitness.js');
var breed = require('./lib/breed.js');
var printOutput = require('./lib/printOutput.js');

//Initial Population
var input = 12;
var desiredOutput = Math.PI * 2;
var popSize = 256;
var survivors = (popSize * .1).toFixed(0);
var num = popSize;
var population = [];
while (num--) {
	population[num] = [baseFunctions[randomIndex(baseFunctions)], baseFunctions[randomIndex(baseFunctions)]];
}

var newGeneration = function () {
	var child;
	var arr0;
	var arr1;
	while (population.length < popSize) {
		arr0 = population[randomIndex(survivors)].slice(0);
		arr1 = population[randomIndex(survivors)].slice(0);
		child = breed(arr0, arr1);
		population.push(child);
	}
	applyFitness(population, input, desiredOutput, survivors);
};
var generations = 32;
while (generations--) {
	newGeneration();
}

printOutput(population, input);
console.log('desired output: ' + desiredOutput);


//development - apply some degree of mutation so funcitons which are no longer used may be reintroduced
//also apply preferential treatment for shorter functions
