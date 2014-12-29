var compose = require('./lib/compose.js');
var baseFunctions = require('./lib/baseFunctions/unaryBaseFunctions.js');
var randomIndex = require('./lib/randomIndex.js');

//Initial Population
var popSize = 256;
var top10Percent = (popSize * .1).toFixed(0);
var num = popSize;
var population = [];
while (num--) {
	population[num] = [baseFunctions[randomIndex(baseFunctions)], baseFunctions[randomIndex(baseFunctions)]];
}
var testNumber = 3;
var desiredOutput = Math.PI * 2;
var applyFitness = function() {
	population.sort(function (a, b) {
		return Math.abs(compose.apply(null, a)(testNumber) - desiredOutput) -
			Math.abs(compose.apply(null, b)(testNumber) - desiredOutput);
	});
	population.splice(top10Percent);
};
applyFitness();
//Breed Function
var breed = function (arr0, arr1) {
	var intRandInd = randomIndex(arr0) + 1;
	if (intRandInd < arr0.length) {
		arr0.splice(intRandInd);
	}
	intRandInd = randomIndex(arr1) + 1;
	if (intRandInd < arr0.length) {
		arr1.splice(intRandInd);
	}
	var num = arr1.length;
	while (num--) {
		arr0.push(arr1[num]);
	}
	return arr0;
};
var newGeneration = function () {
	var child;
	var arr0;
	var arr1;
	while (population.length < popSize) {
		//pass arrays by value not by reference
		arr0 = population[randomIndex(top10Percent)].slice(0);
		arr1 = population[randomIndex(top10Percent)].slice(0);
		child = breed(arr0, arr1);
		population.push(child);
	}
	applyFitness();
};
var generations = 16;
while (generations--) {
	newGeneration();
}
var printView = (function () {
	var num = population.length;
	while (num--) {
		console.log(population[num].length);
		console.log(population[num].toString());
		var res = compose.apply(null, population[num]);
		console.log(res(testNumber));
	}
})();
console.log(desiredOutput);
//development - apply some degree of mutation so funcitons which are no longer used may be reintroduced
//also apply preferential treatment for shorter functions
