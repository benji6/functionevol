//compose
var compose = function() {
	var fns = arguments;
	return function (x) {
		var num = fns.length;
		while (num--) {
			x = fns[num].call(this, x);
		}
		return x;
	};
};
//Useful functions
var randomIndex = function (len) {
	return Math.floor(Math.random() * len);
};
//base functions
var add1 = function (x) {
	return x + 1;
};
var minus1 = function (x) {
	return x - 1;
};
var times2 = function (x) {
	return x * 2;
};
var divide2 = function(x) {
	return x / 2;
};
var negate = function (x) {
	return -x;
};
var invert = function (x) {
	res = 1 / x;
	if (isNaN(res)) {
		return 0;
	}
	return 1 / x;
};
var square = function (x) {
	return Math.pow(x, 2);
};
var squareRoot = function (x) {
	res = Math.sqrt(x);
	if (isNaN(res)) {
		return 0;
	}
	return res;
};
var sin = function (x) {
	return Math.sin(x);
}
//baseFunctions array
var baseFunctions = [add1, minus1, times2, divide2, negate, invert, square, squareRoot, sin];
//Initial Population
var popSize = 256;
var top10Percent = (popSize * .1).toFixed(0);
var num = popSize;
var population = [];
while (num--) {
	population[num] = [baseFunctions[randomIndex(baseFunctions.length)], baseFunctions[randomIndex(baseFunctions.length)]];
}
var testNumber = 3;
var applyFitness = function() {
	population.sort(function (a, b) {
		return Math.pow((compose.apply(null, a)(testNumber) - Math.PI), 2) - Math.pow((compose.apply(null, b)(testNumber) - Math.PI), 2);
	});
	population.splice(top10Percent);
};
applyFitness();
//Breed Function
var breed = function (arr0, arr1) {
	var intRandInd = randomIndex(arr0.length) + 1;
	if (intRandInd < arr0.length) {
		arr0.splice(intRandInd);
	}
	intRandInd = randomIndex(arr1.length) + 1;
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
var consoleOut = function () {
	var num = population.length;
	while (num--) {
		console.log(population[num].length);
		console.log(population[num].toString());
		var res = compose.apply(null, population[num]);
		console.log(res(testNumber));
	}
};
consoleOut();
console.log(Math.PI);
//development - apply some degree of mutation so funcitons which are no longer used may be reintroduced
//also apply preferential treatment for shorter functions